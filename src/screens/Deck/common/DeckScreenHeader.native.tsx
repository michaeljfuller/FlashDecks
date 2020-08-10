import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DeckScreenHeaderBase from "./DeckScreenHeader.common";
import Avatar from "../../../components/avatar/Avatar";
import IconButton, {IconType} from "../../../components/button/IconButton";
import {DeckInfoModal} from "../../../components/deck/DeckInfoModal/DeckInfoModal";

const avatarSize = 24;

export default class DeckScreenHeader extends DeckScreenHeaderBase {
    render() {
        return <View style={styles.root}>

            <View style={styles.row}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{this.props.title || this.props.item.name}</Text>
                </View>
                <View style={styles.infoButton}>
                    <IconButton flat icon={IconType.Info} onClick={this.openInfoModal} />
                </View>
            </View>

            <View style={styles.row}>
                <Avatar
                    user={this.props.item.owner}
                    labelPlacement="right"
                    size={avatarSize}
                    style={styles.avatar}
                    labelStyle={styles.avatarLabel}
                />
                <Text style={styles.cardCount}>{this.cardCount} {this.cardCount !== 1 ? 'cards' : 'card'}</Text>
            </View>

            <DeckInfoModal
                deck={this.props.item}
                open={this.state.showInfo}
                editable={this.props.editable}
                onClose={this.closeInfoModal}
            />

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
        flex: 1,
        lineHeight: avatarSize,
        textAlign: "right",
    },
});
