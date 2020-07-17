import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DeckViewBase from "./DeckView.common";
import Avatar from "../avatar/Avatar";
import IconButton, {IconType} from "../button/IconButton";
import {DeckInfoModal} from "./DeckInfoModal/DeckInfoModal";
import CardCarousel from "../card-carousel/CardCarousel";

const avatarSize = 35;

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

        return <View style={styles.root}>
            {this.renderHeader()}
            <View style={styles.cardCarouselContainer}>
                <CardCarousel cards={deck.cards} style={styles.cardCarousel} />
            </View>
            <DeckInfoModal deck={deck} open={this.state.showInfo} onClose={this.closeInfoModal} />
        </View>;
    }

    renderHeader() {
        const deck = this.props.item;

        return <View style={styles.header}>

            <View style={styles.avatarView}>
                <Avatar user={deck.owner} labelPlacement="right" size={avatarSize} labelStyle={{ color: 'black' }} />
            </View>

            <View style={styles.titleView}>
                <Text style={styles.titleText}>{deck.name}</Text>
                <View style={styles.infoButton}>
                    <IconButton flat icon={IconType.Info} onClick={this.openInfoModal} />
                </View>
            </View>

            <View style={styles.cardCountView}>
                <Text style={styles.cardCount}>{this.cardCount} {this.cardCount !== 1 ? 'cards' : 'card'}</Text>
            </View>

        </View>;
    }

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        marginBottom: 5,
    },
    avatarView: {
        minHeight: avatarSize,
        flex: 1,
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
    cardCarouselContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 'auto',
        marginBottom: 5,
        width: "100%",
        maxWidth: 1200,
        maxHeight: 800,
    },
    cardCarousel: {},
    cardCount: {
        lineHeight: avatarSize,
        textAlign: "right",
    },
});
