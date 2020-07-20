import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DeckScreenHeaderBase from "./DeckScreenHeader.common";
import Avatar from "../../../components/avatar/Avatar";
import IconButton, {IconType} from "../../../components/button/IconButton";
import {DeckInfoModal} from "../../../components/deck/DeckInfoModal/DeckInfoModal";

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
                <Text style={styles.titleText}>{this.props.item.name}</Text>
                <View style={styles.infoButton}>
                    <IconButton flat icon={IconType.Info} onClick={this.openInfoModal} />
                </View>
            </View>

            <View style={styles.cardCountView}>
                <Text style={styles.cardCount}>{this.cardCount} {this.cardCount !== 1 ? 'cards' : 'card'}</Text>
            </View>

            <DeckInfoModal deck={this.props.item} open={this.state.showInfo} onClose={this.closeInfoModal} />

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
        textAlign: "right",
    },
});
