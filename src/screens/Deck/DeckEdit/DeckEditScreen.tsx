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
import deckApi from "../../../api/DeckApi";
import mediaApi from "../../../api/MediaApi";
import ToastStore, {toastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import ApiRequest from "../../../api/util/ApiRequest";
import {removeItem} from "../../../utils/array";
import PromptModal from "../../../components/modal/PromptModal/PromptModal";
import {DeckInfo, DeckInfoModal} from "../../../components/deck/DeckInfoModal/DeckInfoModal";
import {CardInfo, CardInfoModal} from "../../../components/card/CardInfo/CardInfoModal";
import {appTree} from "../../../routes";
import {goBack} from "../../../navigation/navigationHelpers";

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
    saveDeckRequest?: ApiRequest<DeckModel>;
    mediaUploadRequest?: ApiRequest<string>;
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
        this.getDeckRequest && this.getDeckRequest.drop();
        this.saveDeckRequest && this.saveDeckRequest.drop();
        this.mediaUploadRequest && this.mediaUploadRequest.drop();
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
            ({payload, error, dropped}) => {
                deck = payload;
                delete this.getDeckRequest;

                if (!dropped) {
                    this.setStateTo({ loading: false });
                    if (error) this.toast.addError(error, "Error getting deck.");
                }
                this.setStateTo(draft => draft.originalDeck = castDraft(deck));
            }
        );
    }

    modifyDeck(deck: DeckModel, blockNavigation = true) {
        this.setStateTo(draft => draft.modifiedDeck = castDraft(deck));
        if (blockNavigation) this.blockNavigation(true);
    }

    onChangeInfo = (info: DeckInfo) => {
        this.modifyDeck(this.deck.update(info), false);
    }

    clearChanges = () => {
        this.setStateTo({ modifiedDeck: undefined, });
        this.blockNavigation(false);
    }

    onSetCard = (card: CardModel, index: number) => {
        this.modifyDeck(
            this.deck.update( draft => {
                draft.cards[index] = castDraft(card)
            })
        );
    }

    onAddCard = (info: CardInfo) => {
        const card = CardModel.create(info);
        const updated = this.deck.update(draft => {
            draft.cards.push(castDraft(card));
        });
        this.modifyDeck(updated);
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
        let modifiedDeck = this.state.modifiedDeck;

        if (modifiedDeck) {
            this.setStateTo({ saving: true });
            modifiedDeck = await this.uploadContent(modifiedDeck);
            this.saveDeckRequest = deckApi.push(modifiedDeck);

            await this.saveDeckRequest.wait(false);
            const deck = this.saveDeckRequest.payload;
            const {complete, error} = this.saveDeckRequest;

            // If complete (not canceled or errored), update state
            if (complete && deck) {
                this.setStateTo(draft => draft.originalDeck = castDraft(deck) );
                this.clearChanges();
            }

            // Show toast
            const toastRef = 'DeckEditScreen-save';
            if (error) {
                this.toast.addError(error, `Failed to save ${modifiedDeck.title}`, { log: false, ref: toastRef });
                console.error("Error saving deck", { error,  request: this.saveDeckRequest });
            } else {
                console.log('DeckEditScreen.onSavePressed', { response: this.saveDeckRequest, deck });
                this.toast.add({ type: "success", text: `Saved: "${modifiedDeck.title}"`, duration: 2000, ref: toastRef });
            }

            delete this.saveDeckRequest;
            this.setStateTo({ saving: false });
        } else {
            this.toast.add({type: "warning", text: `No changes to save.`});
        }
    }

    async uploadContent(deck: DeckModel): Promise<DeckModel> {
        const observable = mediaApi.uploadFromDeck(deck);
        observable.subscribe(data => {
            console.log('uploadContent', data);
            toastStore.removeByRef();
            toastStore.add({
                title: 'Media Upload',
                text: `Uploading ${data.currentIndex+1}/${data.list.length}.`,
            });
            this.mediaUploadRequest = data.request;
            this.setStateTo(draft => {
                draft.modifiedDeck = castDraft(data.deck);
            });
            deck = data.deck;
        });
        await observable.toPromise().then(
            (data) => {
                delete this.mediaUploadRequest;
                if (data?.list?.length) {
                    toastStore.removeByRef();
                    toastStore.add({title: 'Media Upload', text: 'Complete', type: "success", duration: 1000})
                }
            },
            err => toastStore.addError(err, 'Media Upload')
        );
        return deck;
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
        const validation = DeckModel.validate(this.deck);
        const title = (newDeck? "New" : "Edit") + ": " + (this.deck?.title || 'Untitled');
        const hasChanges = !!this.state.modifiedDeck;
        const card = this.deck.cards[this.cardIndex];

        let saveButtonText = 'Save Cards';
        if (!this.state.modifiedDeck) saveButtonText = 'Save: No changes';
        else if (validation.invalid) saveButtonText = `Save: ${validation.reasons[0]}`

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
            <Button square
                title={saveButtonText}
                disabled={validation.invalid || !editable || !hasChanges}
                onClick={this.onSavePressed}
            />

            <DeckInfoModal
                deck={this.deck}
                open={this.state.showInfoModal}
                editable={editable}
                onChange={this.onChangeInfo}
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
