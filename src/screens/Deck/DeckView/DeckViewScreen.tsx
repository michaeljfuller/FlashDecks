import React from "react";
import {Text} from "react-native";
import {castDraft} from "immer";
import {Subscription} from "rxjs";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import ScreenContainer from "../../ScreenContainer";
import DeckView from "../../../components/deck/DeckView/DeckView";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";
import {reduxConnector, DeckViewScreenStoreProps} from "./DeckViewScreen_redux";
import DeckScreenHeader from "../common/DeckScreenHeader";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi";
import ToastStore from "../../../store/toast/ToastStore";
import {DeckInfoModal} from "../../../components/deck/DeckInfoModal/DeckInfoModal";
import Center from "../../../components/layout/Center";
import ProgressCircle from "../../../components/progress/ProgressCircle";

export interface DeckViewScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckViewScreenState {
    deck?: DeckModel;
    loading: boolean;
    showInfoModal: boolean;
    error?: string;
}
export class DeckViewScreen extends ImmutablePureComponent<DeckViewScreenProps & DeckViewScreenStoreProps, DeckViewScreenState>
{
    state = {
        loading: false,
        showInfoModal: false,
    } as DeckViewScreenState;

    toast = new ToastStore();
    getDeckSubscription?: Subscription;

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (!deckId) {
            return console.warn('No ID'); // TODO Redirect
        }
        this.getDeck(deckId);
    }
    componentWillUnmount() {
        this.getDeckSubscription?.unsubscribe();
        this.toast.removeByRef();
    }

    getDeck(deckId: DeckModel['id']) {
        const localDeck: DeckModel|undefined = this.props.decks[deckId];
        if (localDeck) {
            return this.setStateTo(draft => draft.deck = castDraft(localDeck));
        }

        this.setStateTo({ loading: true });
        this.getDeckSubscription?.unsubscribe();
        this.getDeckSubscription = deckApi.getById(deckId).subscribe(
            remoteDeck => {
                this.setStateTo(draft => {
                    draft.deck = castDraft(remoteDeck);
                    draft.loading = false;
                });
            },
            error => {
                this.toast.addError(error, "Error getting deck.");
                this.setStateTo({ loading: false });
            },
        );
    }

    onOpenInfoModal = () => this.setStateTo({ showInfoModal: true });
    onCloseInfoModal = () => this.setStateTo({ showInfoModal: false });

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
        if (!this.state.deck) return <Center><Text>Could not find deck.</Text></Center>;

        return <React.Fragment>
            <DeckScreenHeader
                item={this.state.deck}
                onOpenInfoModal={this.onOpenInfoModal}
            />
            <DeckView
                item={this.state.deck}
            />
            <DeckInfoModal
                deck={this.state.deck}
                open={this.state.showInfoModal}
                onClose={this.onCloseInfoModal}
            />
        </React.Fragment>;
    }

}

export default reduxConnector(DeckViewScreen);
