import React from "react";
import {Text} from "react-native";
import ScreenContainer from "../../ScreenContainer";
import ImmutablePureComponent, {castDraft} from "../../../components/ImmutablePureComponent";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";

import {reduxConnector, DeckEditScreenStoreProps} from "./DeckEditScreen_redux";
import DeckView from "../../../components/deck/DeckView/DeckView";
import Button from "../../../components/button/Button";
import DeckScreenHeader from "../common/DeckScreenHeader";
import {CardModel, DeckModel, DeckBaseModel} from "../../../models";
import deckApi from "../../../api/DeckApi";
import ToastStore, {toastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import ApiRequest from "../../../api/util/ApiRequest";
import {removeItem} from "../../../utils/array";
import PromptModal from "../../../components/modal/PromptModal/PromptModal";
import {DeckInfoModal} from "../../../components/deck/DeckInfoModal/DeckInfoModal";
import {appTree} from "../../../routes";
import {goBack} from "../../../navigation/navigationHelpers";
import {CardInfoModal} from "../../../components/card/CardInfo/CardInfoModal";
import cardApi from "../../../api/CardApi";

export interface DeckEditScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckEditScreenState {
    originalDeck?: DeckModel;
    modifiedDeck?: DeckModel;
    loading: boolean;
    saving: boolean;
    showInfoModal: boolean;
    showDeleteCardPrompt: boolean;
    showCreateCardModal: boolean;
    error?: string;
}

export class DeckEditScreen extends ImmutablePureComponent<DeckEditScreenProps & DeckEditScreenStoreProps, DeckEditScreenState>
{
    state = {
        loading: false,
        saving: false,
        showInfoModal: false,
        showDeleteCardPrompt: false,
        showCreateCardModal: false,
    } as DeckEditScreenState;

    toast = new ToastStore(this);
    getDeckRequest?: ApiRequest<DeckModel>;
    saveDeckRequest?: ApiRequest<DeckBaseModel>;
    saveCardRequest?: ApiRequest<CardModel>;
    cardIndex = 0;

    get deck() {
        return this.state.modifiedDeck || this.state.originalDeck || new DeckModel;
    }

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (deckId) {
            this.getDeck(deckId);
        } else {
            this.setStateTo(draft => {
                draft.originalDeck = castDraft(new DeckModel);
                draft.showInfoModal = true;
            });
        }
    }
    componentWillUnmount() {
        this.toast.removeByRef();
        this.blockNavigation(false);
        this.getDeckRequest && this.getDeckRequest.cancel();
        this.saveDeckRequest && this.saveDeckRequest.cancel();
        this.saveCardRequest && this.saveCardRequest.cancel();
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
        this.getDeckRequest = deckApi.getById(deckId);

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

    onChange = (deck: DeckModel) => {
        console.group('DeckEditScreen.onChange');
        if (!this.deck?.cards.length && deck.cards.length === 1 && !deck.cards[0].name) { // Added first card
            deck = deck.update(draft => draft.cards = []); // Remove for now
            this.onShowCreateCardModal();
        }
        this.modifyDeck(deck);
        console.groupEnd();
    }
    clearChanges = () => {
        this.setStateTo({ modifiedDeck: undefined, });
        this.blockNavigation(false);
    }

    onSetCard = async (card: CardModel, index: number) => {
        card = card.update(draft => draft.deckID = this.deck.id);
        this.setStateTo({ saving: true });
        this.toast.add({ text: `Saving card`, duration: 1000 });

        this.saveCardRequest = cardApi.push(card);
        await this.saveCardRequest.wait(false);

        const {payload, complete, error} = this.saveCardRequest;

        // If complete (not canceled or errored), update state
        if (complete && payload) {
            this.modifyDeck(
                this.deck.update( draft => draft.cards[index] = castDraft(payload) )
            );
        }

        // Show toast
        const toastRef = 'DeckEditScreen.onSetCard';
        if (error) {
            this.toast.addError(error, "Error saving card.", { log: false, ref: toastRef });
            console.error("Error saving card", { error,  request: this.saveCardRequest });
        } else {
            this.toast.add({ type: "success", text: `Saved: "${payload?.name}".`, duration: 2000, ref: toastRef });
        }

        delete this.saveDeckRequest;
        this.setStateTo({ saving: false });
    }

    onAddCard = (card = new CardModel) => {
        console.log('DeckEditScreen.onAddCard');
        if (this.deck) {
            this.onChange(this.deck.update(draft => {
                draft.cards.push(castDraft(card));
            }));
        }
    }
    onRemoveCard = () => {
        if (this.deck) {
            const cards = removeItem(this.deck.cards, this.cardIndex);
            this.modifyDeck(
                this.deck.update( draft => draft.cards = castDraft(cards) )
            );
        }
    }
    onScrollCards = (index: number) => {
        this.cardIndex = index;
    }

    onOpenDeleteCardPrompt = () => this.setStateTo({ showDeleteCardPrompt: true });
    onCloseDeleteCardPrompt = () => this.setStateTo({ showDeleteCardPrompt: false });

    onOpenInfoModal = () => this.setStateTo({ showInfoModal: true });
    onCloseInfoModal = () => this.setStateTo({ showInfoModal: false });
    onCancelInfoModal = () => {
        if (!this.deck?.id) {
            goBack(this.props.navigation, appTree.DeckRoutes.List);
        }
    };

    onShowCreateCardModal = () => this.setStateTo({ showCreateCardModal: true });
    onHideCreateCardModal = () => this.setStateTo({ showCreateCardModal: false });

    onSavePressed = async () => {
        if (this.state.modifiedDeck) {
            this.setStateTo({ saving: true });
            this.saveDeckRequest = deckApi.push(this.state.modifiedDeck);

            await this.saveDeckRequest.wait(false);
            const deck = this.saveDeckRequest.payload;
            const {complete, error} = this.saveDeckRequest;

            // If complete (not canceled or errored), update state
            if (complete && deck) {
                const updatedDeck = this.state.originalDeck?.update({
                    name: deck.name,
                    description: deck.description,
                    popularity: deck.popularity,
                    tags: deck.tags
                });
                this.setStateTo(draft => draft.originalDeck = castDraft(updatedDeck) );
                this.clearChanges();
            }

            // Show toast
            const toastRef = 'DeckEditScreen-save';
            if (error) {
                this.toast.addError(error, "Error saving deck.", { log: false, ref: toastRef });
                console.error("Error saving deck", { error,  request: this.saveDeckRequest });
            } else {
                this.toast.add({ type: "success", text: `Saved: "${deck?.name}".`, duration: 2000, ref: toastRef });
            }

            delete this.saveDeckRequest;
            this.setStateTo({ saving: false });
        } else {
            this.toast.add({type: "warning", text: `No changes to save.`});
        }
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
        const card = this.deck.cards[this.cardIndex];

        return <React.Fragment>
            <DeckScreenHeader
                editable={editable}
                item={this.deck}
                onOpenInfoModal={this.onOpenInfoModal}
                onAddCard={this.onShowCreateCardModal}
                onRemoveCard={this.onOpenDeleteCardPrompt}
                title={title}
            />
            <DeckView
                editable={editable}
                item={this.deck}
                onSetCard={this.onSetCard}
                onScrollCards={this.onScrollCards}
            />
            <Button
                title={validation.valid ? "Save" : `Save: ${validation.reasons[0]}.`}
                square
                disabled={validation.invalid || !editable}
                onClick={this.onSavePressed}
            />

            <DeckInfoModal
                deck={this.deck}
                open={this.state.showInfoModal}
                editable={editable}
                onChange={this.onChange}
                onCancel={this.onCancelInfoModal}
                onClose={this.onCloseInfoModal}
            />
            <CardInfoModal
                editable
                open={this.state.showCreateCardModal}
                onChange={this.onAddCard}
                onClose={this.onHideCreateCardModal}
            />
            <PromptModal
                onOk={this.onRemoveCard}
                onClose={this.onCloseDeleteCardPrompt}
                open={this.state.showDeleteCardPrompt}
                title="Remove Card?"
                message={
                    `Are you sure you want to remove "${card?.nameOrPlaceholder()}" from the Deck?\n` +
                    `This change will take effect next time you save.`
                }
            />
        </React.Fragment>
    }

}

export default reduxConnector(DeckEditScreen);
