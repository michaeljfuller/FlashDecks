import React from "react";
import {Text, View} from "react-native";
import {castDraft} from "immer";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps} from "../../../navigation/navigation_types";
import DeckList from "../../../components/deck/DeckList/DeckList";

import {reduxConnector, DeckListScreenStoreProps} from "./DeckListScreen_redux";
import DeckRoutes from "../DeckRoutes";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi.mock";
import {toastStore} from "../../../store/toast/ToastStore";
import ApiRequest from "../../../api/util/ApiRequest";

export interface DeckListScreenProps extends NavigationScreenProps {}
export interface DeckListScreenState {
    loading: boolean;
    decks: DeckModel[];
}
export class DeckListScreen extends ImmutablePureComponent<
    DeckListScreenProps & DeckListScreenStoreProps,
    DeckListScreenState
> {
    state = {
        loading: false,
        decks: [],
    } as DeckListScreenState;

    getDeckListRequest?: ApiRequest<DeckModel[]>;

    get decks() {
        return this.state.decks;
    }

    componentDidMount() {
        this.loadDecks();
    }
    componentWillUnmount() {
        this.getDeckListRequest && this.getDeckListRequest.cancel();
    }

    loadDecks() {
        this.setStateTo({ loading: true });
        this.getDeckListRequest = deckApi.getList();

        this.getDeckListRequest.wait().then(({payload, cancelled, error}) => {
            if (!cancelled) {
                if (payload) this.setStateTo(draft => draft.decks = castDraft(payload));
                if (error) toastStore.addError(error, 'Error loading decks');
                this.setStateTo({ loading: false });
            }
            delete this.getDeckListRequest;
        });
    }

    goTo(routeName: string, deck: DeckModel) {
        this.props.navigation.navigate(routeName, {deckId: deck.id})
    }

    goToEdit = (deck: DeckModel) => this.goTo(DeckRoutes.Edit, deck);
    goToView = (deck: DeckModel) => this.goTo(DeckRoutes.View, deck);

    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                <View style={{ padding: 5 }}>{this.renderBody()}</View>
            </ScreenContainer>
        );
    }

    renderBody() {
        if (this.state.loading) return <Text>Loading...</Text>;
        if (this.decks.length === 0) return <Text>No decks found.</Text>;
        return <DeckList
            decks={this.decks}
            loggedInUser={this.props.loggedInUser}
            goToEdit={this.goToEdit}
            goToView={this.goToView}
        />;
    }

}

export default reduxConnector(DeckListScreen);
