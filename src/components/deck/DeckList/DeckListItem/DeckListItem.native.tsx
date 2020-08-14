import React from "react";
import {View} from "react-native";

import {
    // This component adds a box-shadow by default.
    // Also provides default spacing and alignment between cards.
    Card as UICard,
    // This is the child component of Card.
    // Works very similar to the list items of list.
    // Takes input such as: Text, Button, Image, Thumbnail, Icon.
    // Card takes any number of CardItem.
    CardItem as UICardItem,
    Text
} from 'native-base';

import {DefaultTheme} from "../../../../styles/UIColorTheme";
import IconButton, {IconType} from "../../../button/IconButton";
import {DeckListItemProps} from "./DeckListItem.common";
import Avatar from "../../../avatar/Avatar";
import {repeat} from "../../../../utils/array";

const headerColor = DefaultTheme.primary.base;
const headerTextColor = DefaultTheme.secondary.base;

export default function DeckListItem(props: DeckListItemProps) {
    const {deck, showActions, onActions, onClick} = props;
    const {owner} = deck;
    const handleActions = onActions ? (() => onActions(deck)) : undefined;
    const handleClick = onClick ? (() => onClick(deck)) : undefined;

    return <UICard>

        {/* Header */}
        <View style={{ backgroundColor: headerColor, flexDirection: 'row', height: 40 }}>

            <UICardItem button bordered onPress={handleClick} style={{ backgroundColor: headerColor, flexGrow: 1 }}>
                <Text style={{ color: headerTextColor }}>{deck.name}</Text>
            </UICardItem>

            <UICardItem style={{ backgroundColor: headerColor }}>
                <Text style={{ color: headerTextColor, paddingRight: 5 }}>{owner?.displayName || '?'}</Text>
                <Avatar user={owner} size={30} />
            </UICardItem>

            {showActions && <View style={{ paddingTop: 5, paddingRight: 5 }}>
                <IconButton
                    icon={IconType.More}
                    color={DefaultTheme} invertColor
                    onClick={handleActions}
                    width={30}
                />
            </View>}

        </View>

        {/* Body */}
        <UICardItem button bordered onPress={handleClick}>
            <Text>{deck.description + repeat(
                parseInt(deck.id.split('-').pop() || '')-1 || 0, // Get repeat count based on `deck.id`
                i => `${!i&&'\n'}Test sentence number #${i+1} for testing varying paragraph lengths across all decks.`
            ).join(' ')}</Text>
        </UICardItem>

        {/* Footer */}
        {/*<UICardItem footer bordered><Text>{owner.displayName}</Text></UICardItem>*/}

    </UICard>;
}
