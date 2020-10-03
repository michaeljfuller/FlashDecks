import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DeckScreenHeaderBase from "./DeckScreenHeader.common";
import Avatar from "../../../components/avatar/Avatar";
import IconButton, {IconType} from "../../../components/button/IconButton";

const avatarSize = 24;

export default class DeckScreenHeader extends DeckScreenHeaderBase {
    render() {
        return <View style={styles.root}>

            <View style={styles.row}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{this.props.title || this.props.item.title}</Text>
                </View>
                <IconButton style={styles.infoButton} flat icon={IconType.Info} onClick={this.props.onOpenInfoModal} />
            </View>

            <View style={styles.row}>
                <View style={styles.rowLeft}>
                    <Avatar
                        user={this.props.item.owner}
                        labelPlacement="right"
                        size={avatarSize}
                        style={styles.avatar}
                        labelStyle={styles.avatarLabel}
                    />
                </View>
                <View style={styles.rowRight}>
                    {this.props.editable ? <IconButton icon={IconType.Add} style={styles.cardCountButton} onClick={this.props.onAddCard} /> : undefined}
                    {this.props.editable ? <IconButton icon={IconType.Remove} style={styles.cardCountButton} onClick={this.props.onRemoveCard} /> : undefined}
                    <Text style={styles.cardCount}>{this.cardCount} {this.cardCount !== 1 ? 'cards' : 'card'}</Text>
                </View>
            </View>

        </View>;
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        padding: 5,
    },
    row: {
        flexDirection: "row",
        alignSelf: "center",
        position: "relative",
    },
    rowLeft: {
        flexGrow: 1,
    },
    rowRight: {
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    titleView: {
        flex: 1,
        paddingHorizontal: 25, // icon size
    },
    titleText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 26,
        width: "100%",
    },
    infoButton: {
        position: "absolute",
        right: 0,
        top: 7,
    },
    avatar: {
        flex: 1,
    },
    avatarLabel: {
        color: "black"
    },
    cardCount: {
        lineHeight: avatarSize,
        textAlign: "right",
    },
    cardCountButton: {
        paddingTop: (avatarSize-24)/2,
        paddingRight: 5,
    },
});
