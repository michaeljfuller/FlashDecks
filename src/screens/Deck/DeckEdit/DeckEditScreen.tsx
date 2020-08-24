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
import deckApi from "../../../api/DeckApi";
import ToastStore from "../../../store/toast/ToastStore";

export interface DeckEditScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckEditScreenState {
    originalDeck?: DeckModel;
    modifiedDeck?: DeckModel;
    loading: boolean;
    error?: string;
}

export class DeckEditScreen extends ImmutablePureComponent<DeckEditScreenProps & DeckEditScreenStoreProps, DeckEditScreenState>
{
    state = {
        loading: false,
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
    }

    async getDeck(deckId: DeckModel['id']): Promise<DeckModel|undefined> {
        return this.props.decks[deckId] || await deckApi.getById(deckId);
    }

    onChange = (deck: DeckModel) => {
        this.setState({ modifiedDeck: deck });
    }

    onSavePressed = () => {
        this.setState({
            originalDeck: this.state.modifiedDeck,
            modifiedDeck: undefined,
        });
        this.toast.add({ type: "success", text: `Saved: "${this.state.modifiedDeck?.name}".` });
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
        return <React.Fragment>
            <DeckScreenHeader
                editable
                item={this.deck}
                onChange={this.onChange}
                title={`Edit: ${this.deck?.name}`}
            />
            <DeckView
                editable
                item={this.deck}
                onChange={this.onChange}
            />
            <Button
                title="Save"
                square
                disabled={!this.state.modifiedDeck}
                onClick={this.onSavePressed}
            />
        </React.Fragment>
    }

}

export default reduxConnector(DeckEditScreen);
