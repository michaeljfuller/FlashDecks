import React from "react";
import {StyleSheet, Text} from "react-native";
import {castDraft} from "immer";

import ScreenContainer from "../../ScreenContainer";
import {reduxConnector} from "./DeckEditScreen_redux";
import DeckView from "../../../components/deck/DeckView/DeckView";
import DeckScreenHeader from "../common/DeckScreenHeader";
import {CardModel, DeckModel} from "../../../models";
import {toastStore} from "../../../store/toast/ToastStore";
import {removeItem} from "../../../utils/array";
import PromptModal from "../../../components/modal/PromptModal/PromptModal";
import {DeckInfo, DeckInfoModal} from "../../../components/deck/DeckInfoModal/DeckInfoModal";
import {CardInfo, CardInfoModal} from "../../../components/card/CardInfo/CardInfoModal";
import {appTree} from "../../../routes";
import {goBack} from "../../../navigation/navigationHelpers";
import {ProgressModal} from "../../../components/modal/ProgressModal/ProgressModal";
import Center from "../../../components/layout/Center";
import ProgressCircle from "../../../components/progress/ProgressCircle";
import {BaseDeckEditScreen, SaveDeckProgress} from "./BaseDeckEditScreen";
import ProgressBar from "../../../components/progress/ProgressBar";
import {Visibility} from "../../../components/layout/Visibility";

export interface DeckEditScreenState {
    originalDeck?: DeckModel;
    modifiedDeck?: DeckModel;
    loading: boolean;
    saving?: SaveDeckProgress;
    showInfoModal: boolean;
    showDeleteCardPrompt: boolean;
    showCreateCardModal: boolean;
    error?: string;
}

export class DeckEditScreen extends BaseDeckEditScreen<DeckEditScreenState>
{
    state = {
        loading: true,
        showInfoModal: false,
        showDeleteCardPrompt: false,
        showCreateCardModal: false,
    } as DeckEditScreenState;

    cardIndex = 0;

    get deck() {
        return this.state.modifiedDeck || this.state.originalDeck || new DeckModel;
    }

    get isNewDeck(): boolean {
        return !!this.deck?.id;
    }

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (deckId) {
            this.getDeck(deckId).subscribe(
                deck => this.setStateTo(draft => draft.originalDeck = castDraft(deck)),
                error => this.toast.addError(error, "Error getting deck."),
                () => this.setStateTo({ loading: false }),
            )
        } else {
            this.setStateTo(draft => {
                draft.originalDeck = castDraft(new DeckModel);
                draft.showInfoModal = true;
                draft.loading = false;
            });
        }
    }

    modifyDeck(deck: DeckModel, blockNavigation = true) {
        this.setStateTo(draft => draft.modifiedDeck = castDraft(deck));
        if (blockNavigation) this.blockNavigation(true);
    }

    onBlockedNavAttempt = (reason: string) => {
        toastStore.add({
            text: reason,
            actionText: "Clear Changes",
            onClose: action => action && this.clearChanges(),
        });
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

    onCloseSavingModal = () => this.setStateTo({ saving: undefined });

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

    onSavePressed = () => {
        const {modifiedDeck} = this.state;
        if (!modifiedDeck) {
            this.toast.add({type: "warning", text: `No changes to save.`});
            return;
        }

        let progress: SaveDeckProgress;
        this.saveDeckAndContent(modifiedDeck).subscribe(
            next => {
                this.setStateTo(draft => draft.saving = castDraft(progress = next))
            },
            error => {
                console.error("Error saving deck", error);
                this.setStateTo(draft => draft.saving = undefined)
            },
            () => {
                this.setStateTo(draft => {
                    draft.originalDeck = castDraft(progress.deck);
                    draft.saving = undefined;
                });
                this.clearChanges();
            },
        );
    }

    render() {
        return (
            <ScreenContainer>
                {this.renderBody()}
            </ScreenContainer>
        );
    }

    renderBody() {
        if (this.state.loading) return <Center><ProgressCircle size={150} /></Center>;
        if (this.state.error) return <Center><Text>{this.state.error}</Text></Center>;
        if (!this.deck) return <Center><Text>Could not find deck.</Text></Center>;

        const {saving} = this.state;
        const editable = !saving;
        const validation = DeckModel.validate(this.deck);
        const title = (this.isNewDeck ? "New" : "Edit") + ": " + (this.deck?.title || 'Untitled');
        const hasChanges = !!this.state.modifiedDeck;
        const canSave = !validation.invalid && editable && hasChanges;
        const card = this.deck.cards[this.cardIndex];

        let saveButtonText = 'Save Cards';
        if (!this.state.modifiedDeck) saveButtonText = 'Save: No changes';
        else if (validation.invalid) saveButtonText = `Save: ${validation.reasons[0]}`

        let savingMessage = 'Saving Deck.';
        if (saving?.finished) savingMessage = `Saved "${saving.deck.title}".`;
        if (saving?.error) savingMessage = `Failed to Save "${saving.deck.title}".`;

        return <React.Fragment>
            <DeckScreenHeader
                editable={editable}
                item={this.deck}
                onOpenInfoModal={this.onOpenInfoModal}
                onAddCard={this.onShowCreateCardModal}
                onRemoveCard={this.onOpenDeleteCardPrompt}
                title={title}
                saveText={saveButtonText}
                onSave={canSave ? this.onSavePressed : undefined}
                onUndo={hasChanges ? this.clearChanges : undefined}
            />
            <DeckView
                editable={editable}
                item={this.deck}
                onSetCard={this.onSetCard}
                onScrollCards={this.onScrollCards}
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
            <ProgressModal
                open={Boolean(this.state.saving)}
                onClose={this.onCloseSavingModal}
                closeButton={saving?.finished}
                value={!saving?.finished}
                message={savingMessage}
                type="circle"
                bodyStyle={styles.progressModalBody}
            >
                <Visibility render={saving?.contentUploaded === false && (saving?.contentList||[]).length > 0}>
                    {saving?.contentList.length && <Text style={styles.centerText}>Uploading content: {saving.currentIndex+1}/{saving.contentList.length}</Text> }
                    {saving?.currentProgress?.total && <ProgressBar value={saving.currentProgress?.loaded} maxValue={saving.currentProgress.total} /> }
                </Visibility>
            </ProgressModal>
        </React.Fragment>
    }

}

export default reduxConnector(DeckEditScreen);

const styles = StyleSheet.create({
    centerText: {
        textAlign: "center",
    },
    progressModalBody: {
        minHeight: 150,
    },
});
