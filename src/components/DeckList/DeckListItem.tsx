import React from "react";
import {Text, View} from "react-native";
import IconButton, {IconType} from "../button/IconButton";

export interface DeckListItemProps {
    deck: Deck;
}
export default function DeckListItem(props: DeckListItemProps) {
    const {deck} = props;
    const {owner} = deck;
    const handleEdit = () => console.log('Clicked Edit', deck);
    const handleView = () => console.log('Clicked View', deck);

    return <View
        style={{
        margin: 5,
        padding: 2,
        borderWidth: 1,
        borderColor: 'red',
    }}>
        {/*<Text>{JSON.stringify(props.deck, null,  2)}</Text>*/}
        <Text>{deck.name}</Text>
        <Text>{owner.displayName}</Text>
        <Text>{deck.description}</Text>
        <View style={{ flexDirection: 'row', padding: 4 }}>
            <View style={{ paddingRight: 5 }}>
                <IconButton text="Edit" icon={IconType.Edit} onClick={handleEdit} />
            </View>
            <View>
                <IconButton text="View" icon={IconType.View} onClick={handleView} />
            </View>
        </View>
    </View>;
}
