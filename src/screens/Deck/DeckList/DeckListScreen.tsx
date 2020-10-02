import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {castDraft} from "immer";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps} from "../../../navigation/navigation_types";
import DeckList from "../../../components/deck/DeckList/DeckList";
import IconButton, {IconType} from "../../../components/button/IconButton";

import {reduxConnector, DeckListScreenStoreProps} from "./DeckListScreen_redux";
import DeckRoutes from "../DeckRoutes";
import {DeckListItemModel} from "../../../models";
import deckApi from "../../../api/DeckApi";
import {toastStore} from "../../../store/toast/ToastStore";
import ApiRequest from "../../../api/util/ApiRequest";
import {removeItem} from "../../../utils/array";

export interface DeckListScreenProps extends NavigationScreenProps {}
export interface DeckListScreenState {
    loading: boolean;
    decks: DeckListItemModel[];
}
export class DeckListScreen extends ImmutablePureComponent<
    DeckListScreenProps & DeckListScreenStoreProps,
    DeckListScreenState
> {
    state = {
        loading: false,
        decks: [],
    } as DeckListScreenState;

    getDeckListRequest?: ApiRequest<DeckListItemModel[]>;
    deleteDeckListRequest?: ApiRequest<DeckListItemModel>;

    get decks() {
        return this.state.decks;
    }

    componentDidMount() {
        this.loadDecks();
    }
    componentWillUnmount() {
        this.getDeckListRequest && this.getDeckListRequest.cancel();
        this.deleteDeckListRequest && this.deleteDeckListRequest.cancel();
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

    deleteDeck(deck: DeckListItemModel) {
        this.setStateTo({ loading: true });
        this.deleteDeckListRequest = deckApi.remove(deck.id);

        this.deleteDeckListRequest.wait().then(({payload, cancelled, error}) => {
            if (!cancelled) {
                if (payload) this.setStateTo(draft => draft.decks = draft.decks.filter(current => current.id !== payload.id));
                if (error) toastStore.addError(error, `Error deleting "${deck?.title}".`);
                else toastStore.add({type: "success", duration: 2000, text: `Deleted "${deck?.title}".`})
                this.setStateTo({ loading: false });
            }
            delete this.getDeckListRequest;
        });
    }

    goTo(routeName: string, deck?: DeckListItemModel) {
        this.props.navigation.navigate(
            routeName,
            deck ? {deckId: deck.id} : undefined
        );
    }

    goToCreate = () => this.goTo(DeckRoutes.New);
    goToEdit = (deck: DeckListItemModel) => this.goTo(DeckRoutes.Edit, deck);
    goToView = (deck: DeckListItemModel) => this.goTo(DeckRoutes.View, deck);
    handleDelete = (deck: DeckListItemModel) => this.deleteDeck(deck)

    render() {
        return (
            <ScreenContainer>
                <Text style={styles.title}>{this.constructor.name}</Text>
                <View style={styles.actionsRow}>
                    <IconButton icon={IconType.Add} text="New Deck" onClick={this.goToCreate} />
                </View>
                <View style={styles.body}>{this.renderBody()}</View>
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
            onDeleteDeck={this.handleDelete}
        />;
    }

}

export default reduxConnector(DeckListScreen);

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionsRow: {
        padding: 5,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    body: {
        padding: 5,
    },
});
