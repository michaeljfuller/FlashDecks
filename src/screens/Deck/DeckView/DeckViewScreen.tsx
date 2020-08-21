import React from "react";
import {Text} from "react-native";
import {castDraft} from "immer";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import ScreenContainer from "../../ScreenContainer";
import DeckView from "../../../components/deck/DeckView/DeckView";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";
import {reduxConnector, DeckViewScreenStoreProps} from "./DeckViewScreen_redux";
import DeckScreenHeader from "../common/DeckScreenHeader";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi";

export interface DeckViewScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckViewScreenState {
    deck?: DeckModel;
    loading: boolean;
    error?: string;
}
export class DeckViewScreen extends ImmutablePureComponent<DeckViewScreenProps & DeckViewScreenStoreProps, DeckViewScreenState>
{
    state = {
        loading: false,
    } as DeckViewScreenState;

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (!deckId) {
            return console.warn('No ID'); // TODO Redirect
        }

        this.setStateTo({ loading: true });
        this.getDeck(deckId).then(
            deck => this.setStateTo(draft => draft.deck = castDraft(deck)),
            _ => this.setStateTo({ error: `Failed to get deck.` }),
        ).finally(
            () => this.setStateTo({ loading: false }),
        );
    }

    async getDeck(deckId: DeckModel['id']): Promise<DeckModel|undefined> {
        return this.props.decks[deckId] || await deckApi.getById(deckId);
    }

    render() {
        return (
            <ScreenContainer>
                {this.renderBody()}
            </ScreenContainer>
        );
    }

    renderBody() {
        if (this.state.loading) return <Text>Loading Deck...</Text>;
        if (this.state.error) return <Text>{this.state.error}</Text>;
        if (!this.state.deck) return <Text>Could not find deck.</Text>;
        return <React.Fragment>
            <DeckScreenHeader item={this.state.deck} />
            <DeckView item={this.state.deck} />
        </React.Fragment>;
    }

}

export default reduxConnector(DeckViewScreen);
