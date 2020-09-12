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
import ApiRequest from "../../../api/util/ApiRequest";
import ToastStore from "../../../store/toast/ToastStore";

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

    toast = new ToastStore(this);
    getDeckRequest?: ApiRequest<DeckModel|undefined>;

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (!deckId) {
            return console.warn('No ID'); // TODO Redirect
        }
        this.getDeck(deckId);
    }
    componentWillUnmount() {
        this.getDeckRequest && this.getDeckRequest.cancel();
        this.toast.removeByRef();
    }

    getDeck(deckId: DeckModel['id']) {
        let deck: DeckModel|undefined = this.props.decks[deckId];
        if (deck) {
            return this.setStateTo(draft => draft.deck = castDraft(deck));
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
                this.setStateTo(draft => draft.deck = castDraft(deck));
            }
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
