import React from "react";
import {View, StyleSheet} from "react-native";

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

const headerColor = DefaultTheme.primary.base;
const headerTextColor = DefaultTheme.secondary.base;

export const DeckListItem = React.memo(function DeckListItem(props: DeckListItemProps) {
    const {deck, showActions, onActions, onClick} = props;
    const {owner} = deck;
    const handleActions = onActions ? (() => onActions(deck)) : undefined;
    const handleClick = onClick ? (() => onClick(deck)) : undefined;

    return <UICard>

        {/* Header */}
        <View style={styles.header}>

            <UICardItem button bordered onPress={handleClick} style={styles.itemTitle}>
                <Text style={styles.itemTitleText}>{deck.title}</Text>
            </UICardItem>

            <UICardItem style={styles.itemOwner}>
                <Text style={styles.itemOwnerText}>{owner?.displayName || '?'}</Text>
                <Avatar user={owner} size={30} style={{borderWidth:1, borderColor:'red', margin:0, padding:0}} />
            </UICardItem>

            {showActions && <IconButton
                icon={IconType.More}
                style={styles.moreButton}
                color={DefaultTheme} invertColor
                onClick={handleActions}
                size={30}
            />}

        </View>

        {/* Body */}
        <UICardItem button bordered onPress={handleClick}>
            <Text>{deck.descriptionOrPlaceholder}</Text>
        </UICardItem>

        {/* Footer */}
        {/*<UICardItem footer bordered><Text>{owner.displayName}</Text></UICardItem>*/}

    </UICard>;
});
export default DeckListItem;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: headerColor,
        height: 40
    },
    moreButton: {
        marginTop: 5,
        marginRight: 5,
    },
    itemTitle: {
        backgroundColor: headerColor,
        flexGrow: 1,
    },
    itemTitleText: {
        color: headerTextColor,
    },
    itemOwner: {
        backgroundColor: headerColor,
    },
    itemOwnerText: {
        color: headerTextColor,
        marginRight: 5,
    },
});
