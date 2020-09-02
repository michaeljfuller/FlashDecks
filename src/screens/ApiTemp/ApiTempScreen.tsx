import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import ImmutablePureComponent from "../../components/ImmutablePureComponent";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, ApiTempScreenStoreProps} from "./ApiTempScreen_redux";
import deckApi from "../../api/DeckApi";
import {CardModel, CardSideModel, DeckModel} from "../../models";
import {castDraft} from "immer";

export type ApiTempScreenProps = NavigationScreenProps;
export type ApiTempScreenState = Readonly<{
    decks: DeckModel[];
}>;

export class ApiTempScreen extends ImmutablePureComponent<
    ApiTempScreenProps & ApiTempScreenStoreProps,
    ApiTempScreenState
> {
    readonly state = {} as ApiTempScreenState;

    async componentDidMount() {
        const user = this.props.loggedInUser;
        if (user) {
            const decks = await deckApi.getForUser(user.id);
            this.setStateTo(draft => draft.decks = castDraft(decks));
        }
    }

    render() {
        const decks = this.state.decks || [];
        return (
            <ScreenContainer style={{ paddingHorizontal: 10 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', textAlign: "center" }}>ApiTempScreen</Text>
                    <Text style={{ fontWeight: 'bold' }}>Decks: {decks.length}</Text>
                    <View>{decks.map(
                        deck => <DeckInfo key={deck.id} deck={deck} />
                    )}</View>
                    <Text>{JSON.stringify(this.state.decks, null, 4)}</Text>
                </View>
            </ScreenContainer>
        );
    }

}
export default reduxConnector(ApiTempScreen);

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

const DeckInfo = React.memo(function DeckInfo({deck}: { deck: DeckModel }) {
    return <View style={deckStyles.view}>
        <NameValue name="Deck ID" value={deck.id} />
        <NameValue name="Description" value={deck.description} />
        <NameValue name="Tags" value={deck.tags.join(' | ')} />
        <NameValue name="Owner" value={`${deck.ownerId} - ${deck.owner?.displayName || '?'}`} />
        <NameValue name="Cards" value={deck.cards.length} />
        <View>{deck.cards.map(
            card => <CardInfo key={card.id} card={card} />
        )}</View>
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

const CardInfo = React.memo(function CardInfo({card}: { card: CardModel }) {
    return <View style={cardStyles.view}>
        <NameValue name="Card ID" value={card.id} />
        <NameValue name="Name" value={card.name} />
        <NameValue name="Owner" value={`${card.ownerId} - ${card.owner?.displayName || '?'}`} />
        <NameValue name="Sides" value={card.sides.length} />
        <View>{card.sides.map(
            (side, index) => <SideInfo key={index} side={side} index={index} />
        )}</View>
    </View>
});
const cardStyles = StyleSheet.create({
    view: {
        borderWidth: 1,
        padding: 2,
        paddingLeft: 5,
        marginTop: 10,
        backgroundColor: 'lightblue',
    },
});

const SideInfo = React.memo(function SideInfo({side, index}: { side: CardSideModel; index: number }) {
    return <View style={sideStyles.view}>
        <NameValue name="Side" value={index+1} />
        {side.content.map(
            content => <View key={content.id} style={sideStyles.content}>
                <NameValue name="Content ID" value={content.id} />
                <NameValue name="Type" value={content.type} />
                <NameValue name="Size" value={content.size} />
                <NameValue name="Value" value={content.value} />
            </View>
        )}
    </View>
});
const sideStyles = StyleSheet.create({
    view: {
        borderWidth: 1,
        padding: 2,
        paddingLeft: 5,
        marginTop: 10,
        backgroundColor: 'lightgreen',
    },
    content: {
        borderWidth: 1,
        padding: 2,
        paddingLeft: 5,
        marginTop: 5,
        backgroundColor: 'orange',
    },
});
