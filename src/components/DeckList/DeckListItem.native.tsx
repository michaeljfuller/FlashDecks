import React from "react";
import {Text, View} from "react-native";
import IconButton, {IconType} from "../button/IconButton";
import {DeckListItemProps} from "./DeckListItem.common";

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
        flexDirection: 'row'
    }}>
        {/* Left */}
        <View style={{ flex: 1 }}>
            <Text>{deck.name}</Text>
            <Text>{deck.description}</Text>

        </View>
        {/* Right */}
        <View style={{ flex: 1 }}>

            <Text>{owner.displayName}</Text>

            {/* Actions */}
            <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingRight: 5 }}>
                        <IconButton text="Edit" icon={IconType.Edit} onClick={handleEdit} />
                    </View>
                    <View>
                        <IconButton text="View" icon={IconType.View} onClick={handleView} />
                    </View>
                </View>
            </View>

        </View>
    </View>;
}
