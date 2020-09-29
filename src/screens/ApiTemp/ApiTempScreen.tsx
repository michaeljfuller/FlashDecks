import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import ImmutablePureComponent from "../../components/ImmutablePureComponent";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, ApiTempScreenStoreProps} from "./ApiTempScreen_redux";
import deckApi from "../../api/DeckApi";
import {DeckListItemModel} from "../../models";
import {castDraft} from "immer";
import ToastStore from "../../store/toast/ToastStore";
import ApiRequest from "../../api/util/ApiRequest";

export type ApiTempScreenProps = NavigationScreenProps;
export type ApiTempScreenState = Readonly<{
    decks: DeckListItemModel[];
    userDecks: DeckListItemModel[];
    loadingDecks: boolean;
    loadingUserDecks: boolean;
}>;

export class ApiTempScreen extends ImmutablePureComponent<
    ApiTempScreenProps & ApiTempScreenStoreProps,
    ApiTempScreenState
> {
    readonly state = {
        loadingDecks: true,
        loadingUserDecks: true,
    } as ApiTempScreenState;

    toast = new ToastStore(this);
    private userDecksRequest?: ApiRequest<DeckListItemModel[]>;
    private allDecksRequest?: ApiRequest<DeckListItemModel[]>;

    async componentDidMount() {
        this.loadUserDecks();
        this.loadAllDecks();
    }

    loadUserDecks() {
        const user = this.props.loggedInUser;
        if (user && !this.userDecksRequest) {
            this.userDecksRequest = deckApi.getForUser(user.id);
            this.userDecksRequest.wait().then(
                ({ cancelled, payload }) => {
                    delete this.userDecksRequest;
                    if (cancelled) return;
                    this.setStateTo(draft => {
                        draft.userDecks = castDraft(payload) || [];
                        draft.loadingUserDecks = false;
                    });
                },
                error => this.toast.addError(error, 'Error getting own decks')
            );
        }
    }

    loadAllDecks() {
        if (!this.allDecksRequest) {
            this.allDecksRequest = deckApi.getList();
            this.allDecksRequest.wait().then(
                ({cancelled, payload}) => {
                    delete this.allDecksRequest;
                    if (cancelled) return;
                    this.setStateTo(draft => {
                        draft.decks = castDraft(payload) || [];
                        draft.loadingDecks = false;
                    });
                },
                error => this.toast.addError(error, 'Error getting all decks')
            );
        }
    }

    componentWillUnmount() {
        this.toast.removeByRef();
        if (this.userDecksRequest) this.userDecksRequest.cancel();
        if (this.allDecksRequest) this.allDecksRequest.cancel();
    }

    render() {
        const user = this.props.loggedInUser;
        const decks = this.state.decks || [];
        const userDecks = this.state.userDecks || [];

        return (
            <ScreenContainer style={{ paddingHorizontal: 10 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', textAlign: "center" }}>ApiTempScreen</Text>

                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Own Decks ({user?.displayName || '?'} : {user?.id || '?'} ): {userDecks.length}</Text>
                        <LoadingText show={this.state.loadingUserDecks} />
                        <View>{userDecks.map( deck => <DeckInfo key={deck.id} deck={deck} /> )}</View>
                        {/*<Text>this.state.userDecks = {JSON.stringify(this.state.userDecks, null, 4) || typeof this.state.userDecks};</Text>*/}
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>All Decks: {decks.length}</Text>
                        <LoadingText show={this.state.loadingDecks} />
                        <View>{decks.map( deck => <DeckInfo key={deck.id} deck={deck} /> )}</View>
                        {/*<Text>this.state.decks = {JSON.stringify(this.state.decks, null, 4) || typeof this.state.decks};</Text>*/}
                    </View>

                </View>
            </ScreenContainer>
        );
    }

}
export default reduxConnector(ApiTempScreen);

//<editor-fold desc="Sub-components">

const NameValue = React.memo(function NameValue(
    {name, value, maxHeight=150, minNameWidth=80}: { name: string; value: any; maxHeight?: number; minNameWidth?: number }
){
    return <View style={nameValueStyles.view}>
        <Text style={[nameValueStyles.name, { minWidth: minNameWidth }]}>{name}:</Text>
        <ScrollView style={{ maxHeight }}>
            <Text style={nameValueStyles.value}>{value}</Text>
        </ScrollView>
    </View>;
});
const nameValueStyles = StyleSheet.create({
    view: { flexDirection: 'row' },
    name: { fontWeight: 'bold', marginRight: 5 },
    value: {},
});

const DeckInfo = React.memo(function DeckInfo({deck}: { deck: DeckListItemModel }) {
    return <View style={deckStyles.view}>
        <NameValue name="Deck ID" value={deck.id} />
        <NameValue name="Name" value={deck.title} />
        <NameValue name="Description" value={deck.description} />
        <NameValue name={`Tags (${deck.tags.length})`} value={deck.tags.join(' | ')} />
        <NameValue name="Owner" value={`${deck.ownerId} - ${deck.owner?.displayName || '?'}`} />
    </View>;
});
const deckStyles = StyleSheet.create({
    view: {
        borderWidth: 1,
        padding: 2,
        paddingLeft: 5,
        marginBottom: 10,
        backgroundColor: 'pink',
    },
    cards: { backgroundColor: 'red' }
});

// const CardInfo = React.memo(function CardInfo({card}: { card: CardModel }) {
//     return <View style={cardStyles.view}>
//         <NameValue name="Card ID" value={card.id} />
//         <NameValue name="Name" value={card.name} />
//         <NameValue name="Owner" value={`${card.ownerId} - ${card.owner?.displayName || '?'}`} />
//         <NameValue name="Sides" value={card.sides.length} />
//         <View>{card.sides.map(
//             (side, index) => <SideInfo key={index} side={side} index={index} />
//         )}</View>
//     </View>;
// });
// const cardStyles = StyleSheet.create({
//     view: {
//         borderWidth: 1,
//         padding: 2,
//         paddingLeft: 5,
//         marginTop: 10,
//         backgroundColor: 'lightblue',
//     },
// });

// const SideInfo = React.memo(function SideInfo({side, index}: { side: CardSideModel; index: number }) {
//     return <View style={sideStyles.view}>
//         <NameValue name="Side" value={index+1} />
//         {side.content.map(
//             content => <View key={content.id} style={sideStyles.content}>
//                 <NameValue name="Content ID" value={content.id} />
//                 <NameValue name="Type" value={content.type} />
//                 <NameValue name="Size" value={content.size} />
//                 <NameValue name="Value" value={content.value} />
//             </View>
//         )}
//     </View>;
// });
// const sideStyles = StyleSheet.create({
//     view: {
//         borderWidth: 1,
//         padding: 2,
//         paddingLeft: 5,
//         marginTop: 10,
//         backgroundColor: 'lightgreen',
//     },
//     content: {
//         borderWidth: 1,
//         padding: 2,
//         paddingLeft: 5,
//         marginTop: 5,
//         backgroundColor: 'orange',
//     },
// });

interface LoadingTextProps {
    show: boolean;
}
const LoadingText: React.ComponentType<LoadingTextProps> = React.memo(function LoadingText({show}: LoadingTextProps) {
    return show ? <Text>Loading...</Text> : null;
});
LoadingText.propTypes = {
    show: PropTypes.bool,
} as Record<keyof LoadingTextProps, any>;

//</editor-fold>
