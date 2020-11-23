import React from "react";
import {StyleSheet, Text, View} from "react-native";
import DeckScreenHeaderBase from "./DeckScreenHeader.common";
import Avatar from "../../../components/avatar/Avatar";
import IconButton, {IconType} from "../../../components/button/IconButton";

const avatarSize = 35;

export default class DeckScreenHeader extends DeckScreenHeaderBase {
    render() {
        return <View style={styles.root}>

            <View style={styles.avatarView}>
                <Avatar
                    user={this.props.item.owner}
                    labelPlacement="right"
                    size={avatarSize}
                    labelStyle={styles.avatarLabel}
                />
            </View>

            <View style={styles.titleView}>
                <Text style={styles.titleText}>{this.props.title || this.props.item.title}</Text>
                <IconButton style={styles.infoButton} flat icon={IconType.Info} onClick={this.props.onOpenInfoModal} />
            </View>

            <View style={styles.cardCountView}>
                {this.props.editable ? <IconButton icon={IconType.Add} style={styles.cardCountButton} onClick={this.props.onAddCard} /> : undefined}
                {this.props.editable ? <IconButton icon={IconType.Remove} style={styles.cardCountButton} onClick={this.props.onRemoveCard} /> : undefined}
                <Text style={styles.cardCount}>{this.cardCount} {this.cardCount !== 1 ? 'cards' : 'card'}</Text>
            </View>

        </View>;
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        padding: 5,
    },
    avatarView: {
        minHeight: avatarSize,
        flex: 1,
    },
    avatarLabel: {
        color: 'black',
    },
    titleView: {
        height: avatarSize,
        flexDirection: "row",
        alignItems: "center",
    },
    cardCountView: {
        minHeight: avatarSize,
        flex: 1,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    titleText: {
        lineHeight: avatarSize,
        fontSize: Math.floor(avatarSize*0.7),
        fontWeight: "bold",
    },
    infoButton: {
        paddingLeft: 5,
    },
    cardCount: {
        lineHeight: avatarSize,
    },
    cardCountButton: {
        paddingTop: (avatarSize-24)/2,
        paddingRight: 5,
    },
});
