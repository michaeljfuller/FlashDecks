import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DeckViewBase from "./DeckView.common";
import Avatar from "../avatar/Avatar";
import {DeckInfoModal} from "./DeckInfoModal/DeckInfoModal";
import IconButton, {IconType} from "../button/IconButton";

const avatarSize = 24;

export interface DeckViewState {
    showInfo: boolean;
}
export default class DeckView extends DeckViewBase<DeckViewState> {
    state: DeckViewState = {
        showInfo: false,
    };

    openInfoModal = () => this.setState({ showInfo: true });
    closeInfoModal = () => this.setState({ showInfo: false });

    render() {
        const deck = this.props.item;

        return <View>
            {this.renderHeader()}
            {this.renderCards(styles.cards)}
            <DeckInfoModal deck={deck} open={this.state.showInfo} onClose={this.closeInfoModal} />
        </View>;
    }

    renderHeader() {
        const deck = this.props.item;

        return <View style={styles.header}>

            <View style={styles.headerRow}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{deck.name}</Text>
                </View>
                <View style={styles.infoButton}>
                    <IconButton flat icon={IconType.Info} onClick={this.openInfoModal} />
                </View>
            </View>

            <View style={styles.headerRow}>
                <Avatar user={deck.owner} labelPlacement="right" size={avatarSize} style={styles.avatar} labelStyle={styles.avatarLabel} />
                <Text style={styles.cardCount}>{this.cardCount} {this.cardCount !== 1 ? 'cards' : 'card'}</Text>
            </View>

        </View>;
    }

}

const styles = StyleSheet.create({
    header: {
        flexDirection: "column",
        marginBottom: 5,
    },
    headerRow: {
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
    cards: {
        marginTop: 5,
        maxWidth: 550,
        marginHorizontal:"auto",
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
