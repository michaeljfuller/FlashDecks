import React from "react";
import {Text} from "react-native";
import {castDraft} from "immer";
import ScreenContainer from "../../ScreenContainer";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";

import {reduxConnector, DeckEditScreenStoreProps} from "./DeckEditScreen_redux";
import DeckView from "../../../components/deck/DeckView/DeckView";
import Button from "../../../components/button/Button";
import DeckScreenHeader from "../common/DeckScreenHeader";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi.mock";
import ToastStore, {toastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";

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

    get deck() {
        return this.state.modifiedDeck || this.state.originalDeck;
    }

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (!deckId) {
            return console.warn('No ID'); // TODO Redirect
        }

        this.setStateTo({ loading: true });
        this.getDeck(deckId).then(
            deck => this.setStateTo(draft => draft.originalDeck = castDraft(deck)),
            _ => this.setStateTo({ error: `Failed to get deck.` }),
        ).finally(
            () => this.setStateTo({ loading: false }),
        );
    }
    componentWillUnmount() {
        this.toast.removeByRef();
        this.blockNavigation(false);
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

    async getDeck(deckId: DeckModel['id']): Promise<DeckModel|undefined> {
        return this.props.decks[deckId] || await deckApi.getById(deckId);
    }

    onChange = (deck: DeckModel) => {
        this.setStateTo(draft => draft.modifiedDeck = castDraft(deck));
        this.blockNavigation(true);
    }
    clearChanges = () => {
        this.setStateTo({ modifiedDeck: undefined, });
        this.blockNavigation(false);
    }

    onSavePressed = async () => {
        if (this.state.modifiedDeck) {
            try {
                this.setStateTo({ saving: true });
                const deck = await deckApi.push(this.state.modifiedDeck);
                this.setStateTo(draft => {
                    draft.originalDeck = castDraft(deck);
                    draft.saving = false;
                });
                this.clearChanges();
                this.toast.add({ type: "success", text: `Saved: "${deck?.name}".`, duration: 2000 });
            } catch (e) {
                this.toast.addError(e, "Error saving deck.")
            }
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
        const editable = !this.state.saving;
        return <React.Fragment>
            <DeckScreenHeader
                editable={editable}
                item={this.deck}
                onChange={this.onChange}
                title={`Edit: ${this.deck?.name}`}
            />
            <DeckView
                editable={editable}
                item={this.deck}
                onChange={this.onChange}
            />
            <Button
                title="Save"
                square
                disabled={!this.state.modifiedDeck || !editable}
                onClick={this.onSavePressed}
            />
        </React.Fragment>
    }

}

export default reduxConnector(DeckEditScreen);
