import React from "react";
import {Text} from "react-native";
import ScreenContainer from "../../ScreenContainer";
import ImmutablePureComponent, {castDraft} from "../../../components/ImmutablePureComponent";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";

import {reduxConnector, DeckEditScreenStoreProps} from "./DeckEditScreen_redux";
import DeckView from "../../../components/deck/DeckView/DeckView";
import Button from "../../../components/button/Button";
import DeckScreenHeader from "../common/DeckScreenHeader";
import {CardModel, DeckModel} from "../../../models";
import mockDeckApi from "../../../api/DeckApi.mock";
import deckApi from "../../../api/DeckApi";
import ToastStore, {toastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import ApiRequest from "../../../api/util/ApiRequest";
import {removeItem} from "../../../utils/array";

export interface DeckEditScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckEditScreenState {
    originalDeck?: DeckModel;
    modifiedDeck?: DeckModel;
    loading: boolean;
    saving: boolean;
    error?: string;
}

export class DeckEditScreen extends ImmutablePureComponent<DeckEditScreenProps & DeckEditScreenStoreProps, DeckEditScreenState>
{
    state = {
        loading: false,
        saving: false,
    } as DeckEditScreenState;

    toast = new ToastStore(this);
    getDeckRequest?: ApiRequest<DeckModel|undefined>;
    saveDeckRequest?: ApiRequest<DeckModel|undefined>;
    cardIndex = 0;

    get deck() {
        return this.state.modifiedDeck || this.state.originalDeck;
    }

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (deckId) {
            this.getDeck(deckId);
        } else {
            this.setStateTo( draft => draft.originalDeck = castDraft(new DeckModel()) );
        }
    }
    componentWillUnmount() {
        this.toast.removeByRef();
        this.blockNavigation(false);
        this.getDeckRequest && this.getDeckRequest.cancel();
        this.saveDeckRequest && this.saveDeckRequest.cancel();
    }

    blockNavigation(value = true) {
        const ref = 'DeckEditScreen_Modified';
        if (value) {
            !navigationStore.has(ref) && navigationStore.block({
                ref, reason: "There are unsaved changes.", attemptCallback: this.onBlockedNavAttempt
            });
        } else {
            navigationStore.unblock(ref);
        }
    }
    onBlockedNavAttempt = (reason: string) => {
        toastStore.add({
            text: reason,
            actionText: "Clear Changes",
            onClose: action => action && this.clearChanges(),
        });
    }

    getDeck(deckId: DeckModel['id']) {
        let deck: DeckModel|undefined = this.props.decks[deckId];
        if (deck) {
            return this.setStateTo(draft => draft.originalDeck = castDraft(deck));
        }

        this.setStateTo({ loading: true });
        this.getDeckRequest = mockDeckApi.getById(deckId);

        this.getDeckRequest.wait(true).then(
            ({payload, error, cancelled}) => {
                deck = payload;
                delete this.getDeckRequest;

                if (!cancelled) {
                    this.setStateTo({ loading: false });
                    if (error) this.toast.addError(error, "Error getting deck.");
                }
                this.setStateTo(draft => draft.originalDeck = castDraft(deck));
            }
        );
    }

    modifyDeck(deck: DeckModel) {
        this.setStateTo(draft => draft.modifiedDeck = castDraft(deck));
        this.blockNavigation(true);
    }

    modifyCards(cards: CardModel[]) {
        if (this.deck) {
            this.modifyDeck(
                this.deck.update( draft => draft.cards = castDraft(cards) )
            );
        }
    }

    removeCard() {
        if (this.deck) {
            this.modifyCards(removeItem(this.deck.cards, this.cardIndex));
        }
    }

    onChange = (deck: DeckModel) => {
        this.modifyDeck(deck);
    }
    clearChanges = () => {
        this.setStateTo({ modifiedDeck: undefined, });
        this.blockNavigation(false);
    }
    onAddCard = () => {
        if (this.deck) {
            this.onChange(this.deck.update(draft => {
                const card = castDraft(new CardModel());
                draft.cards.push(card);
            }));
        }
    }
    onRemoveCard = () => { // TODO Add modal
        this.removeCard();
    }

    onSavePressed = async () => {
        if (this.state.modifiedDeck) {
            this.setStateTo({ saving: true });
            this.saveDeckRequest = deckApi.push(this.state.modifiedDeck);

            await this.saveDeckRequest.wait(false);
            const deck = this.saveDeckRequest.payload;
            const {cancelled, error} = this.saveDeckRequest;

            // If complete (not canceled or errored), update state
            if (cancelled) {
                this.setStateTo(draft => {
                    draft.originalDeck = castDraft(deck);
                    draft.saving = false;
                });
                this.clearChanges();
            }

            // Show toast
            const toastRef = 'DeckEditScreen-save';
            if (error) {
                this.toast.addError(error, "Error saving deck.", { ref: toastRef })
            } else {
                this.toast.add({ type: "success", text: `Saved: "${deck?.name}".`, duration: 2000, ref: toastRef })
            }

            delete this.saveDeckRequest;
        } else {
            this.toast.add({type: "warning", text: `No changes to save.`});
        }
    }

    onScrollCards = (index: number) => {
        console.log('DeckEditScreen.onScrollCards()', index);
        this.cardIndex = index;
    }

    render() {
        return (
            <ScreenContainer>
                {this.renderBody()}
            </ScreenContainer>
        );
    }

    renderBody() {
        if (this.state.loading) return <Text style={{lineHeight: 50}}>Loading Deck...</Text>;
        if (this.state.error) return <Text>{this.state.error}</Text>;
        if (!this.deck) return <Text>Could not find deck.</Text>;

        const newDeck = !this.deck?.id;
        const editable = !this.state.saving;
        const title = (newDeck? "New" : "Edit") + ": " + (this.deck?.name || 'Untitled');
        const validation = DeckModel.validate(this.state.modifiedDeck);

        return <React.Fragment>
            <DeckScreenHeader
                editable={editable}
                item={this.deck}
                onChange={this.onChange}
                onAddCard={this.onAddCard}
                onRemoveCard={this.onRemoveCard}
                title={title}
            />
            <DeckView
                editable={editable}
                item={this.deck}
                onChange={this.onChange}
                onScrollCards={this.onScrollCards}
            />
            <Button
                title={validation.valid ? "Save" : `Save: ${validation.reasons[0]}.`}
                square
                disabled={validation.invalid || !editable}
                onClick={this.onSavePressed}
            />
        </React.Fragment>
    }

}

export default reduxConnector(DeckEditScreen);
