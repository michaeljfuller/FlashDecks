import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Subscription} from "rxjs";

import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";
import DeckList from "../../../components/deck/DeckList/DeckList";
import Button from "../../../components/button/Button";
import {reduxConnector, DeckListScreenStoreProps} from "./DeckListScreen_redux";
import DeckRoutes from "../DeckRoutes";
import {DeckListItemModel} from "../../../models";
import deckApi from "../../../api/DeckApi";
import {toastStore} from "../../../store/toast/ToastStore";
import Row from "../../../components/layout/Row";
import Center from "../../../components/layout/Center";
import ProgressCircle from "../../../components/progress/ProgressCircle";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";
import ProgressBar from "../../../components/progress/ProgressBar";

export interface DeckListScreenNavigationProps {
    s?: DeckSelection;
}
export interface DeckListScreenProps extends NavigationScreenProps<
    NavigationScreenState, DeckListScreenNavigationProps
> {}
export interface DeckListScreenState {
    loading: boolean;
    decks: DeckListItemModel[];
}
type DeckSelection = "all"|"own";

export class DeckListScreen extends ImmutablePureComponent<
    DeckListScreenProps & DeckListScreenStoreProps,
    DeckListScreenState
> {
    state = {
        loading: false,
        decks: [],
    } as DeckListScreenState;

    nextToken?: string;
    getDeckListSubscription?: Subscription;
    deleteDeckListSubscription?: Subscription;

    get decks() {
        return this.state.decks;
    }

    get selection(): DeckSelection {
        return this.props.route.params?.s || "own";
    }

    componentDidMount() {
        this.loadDecks();
    }
    componentDidUpdate(prevProps: Readonly<DeckListScreenProps & DeckListScreenStoreProps>/*, prevState: Readonly<DeckListScreenState>, snapshot?: {}*/) {
        if (prevProps.route.params?.s !== this.props.route.params?.s) {
            this.setStateTo(draft => draft.decks = []);
            this.loadDecks();
        }
    }
    componentWillUnmount() {
        this.getDeckListSubscription?.unsubscribe();
        this.deleteDeckListSubscription?.unsubscribe();
    }

    loadDecks(nextToken?: string) {
        let request: ReturnType<typeof deckApi.getList|typeof deckApi.getForUser>|undefined = undefined;
        if (this.selection === "all") request = deckApi.getList({
            limit: 3, nextToken,
        });
        else if (this.selection === "own") request = deckApi.getForUser(this.props.loggedInUser?.id, {
            limit: 3, nextToken,
        });

        const {promise, subscription} = request?.toPromiseAndSubscription() || {};
        this.setStateTo({ loading: true });

        this.getDeckListSubscription?.unsubscribe();
        this.getDeckListSubscription = subscription;

        promise?.then(
            data => {
                this.setStateTo( draft => draft.decks = draft.decks.concat(data.decks) );
                this.nextToken = data.nextToken;
            },
            error => toastStore.addError(error, 'Error loading decks'),
        ).finally(() => this.setStateTo({ loading: false }));
    }

    deleteDeck(deck: DeckListItemModel) {
        this.setStateTo({ loading: true });
        this.deleteDeckListSubscription?.unsubscribe();
        this.deleteDeckListSubscription = deckApi.remove(deck.id).subscribe(
            deletedDeck => {
                this.setStateTo(draft => draft.decks = draft.decks.filter(current => current.id !== deletedDeck.id));
            },
            error => {
                toastStore.addError(error, `Error deleting "${deck?.title}".`);
                this.setStateTo({ loading: false });
            },
            () => {
                toastStore.add({type: "success", duration: 2000, text: `Deleted "${deck?.title}".`});
                this.setStateTo({ loading: false });
            },
        );
    }

    goTo(routeName: string, deck?: DeckListItemModel) {
        this.props.navigation.navigate(
            routeName,
            deck ? {deckId: deck.id} : undefined
        );
    }
    setSelection(selection: DeckSelection) {
        this.nextToken = undefined;
        this.props.navigation.navigate(
            DeckRoutes.List, {
                s: selection
            } as DeckListScreenNavigationProps
        );
    }

    selectAllDecks = () => this.setSelection("all");
    selectOwnDecks = () => this.setSelection("own");
    loadMore = () => this.loadDecks(this.nextToken);

    goToCreate = () => this.goTo(DeckRoutes.New);
    goToEdit = (deck: DeckListItemModel) => this.goTo(DeckRoutes.Edit, deck);
    goToView = (deck: DeckListItemModel) => this.goTo(DeckRoutes.View, deck);
    handleDelete = (deck: DeckListItemModel) => this.deleteDeck(deck);

    render() {
        return (
            <ScreenContainer>
                <Text style={styles.title}>{this.constructor.name}: {this.selection}</Text>

                <Row style={styles.actionsRow}>
                    <ActionsButton title="Own Decks" onClick={this.selectOwnDecks} disabled={this.selection==="own"} />
                    <ActionsButton title="All Decks" onClick={this.selectAllDecks} disabled={this.selection==="all"} />
                    <ActionsButton title="Create Deck" onClick={this.goToCreate} />
                </Row>

                <View style={styles.body}>
                    {this.decks.length > 0
                    ?   <DeckList
                            decks={this.decks}
                            loggedInUser={this.props.loggedInUser}
                            goToEdit={this.goToEdit}
                            goToView={this.goToView}
                            onDeleteDeck={this.handleDelete}
                        />
                    :   <Center>{ this.state.loading ? <ProgressCircle size={150} /> : <Text>No decks found.</Text> }</Center>
                    }
                </View>

                { this.state.loading && this.decks.length > 0 ? <ProgressBar /> : null }

                <Row style={styles.actionsRow}>
                    <ActionsButton title="Load More" onClick={this.loadMore} disabled={!this.nextToken} />
                </Row>
            </ScreenContainer>
        );
    }

    renderBody() {
        if (this.decks.length === 0) {
            if (this.state.loading) {
                return <Center><ProgressCircle size={150} /></Center>;
            } else {
                return <Center><Text>No decks found.</Text></Center>;
            }
        }

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
    },
    body: {
        padding: 5,
        flex:1,
    },
});

const ActionsButton = withDefaultProps(
    Button,
    { square: true, flat: true, flex: true },
    {},
    "ActionsButton"
);
