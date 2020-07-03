import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DeckViewBase from "./DeckView.common";
import Avatar from "../avatar/Avatar";
import IconButton, {IconType} from "../button/IconButton";
import {DeckInfoModal} from "./DeckInfoModal/DeckInfoModal";

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

        return <View>
            {this.renderHeader()}
            <View style={styles.descriptionView}>
                <Text style={styles.descriptionText}>{deck.description}</Text>
            </View>
            {this.renderCards(styles.cards)}
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

            <View style={styles.tagsView}>
                {this.renderTags(styles.tags)}
            </View>

        </View>;
    }

}

const styles = StyleSheet.create({
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
    tagsView: {
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
    descriptionView: {
        borderWidth: 1,
        padding: 2,
        backgroundColor: "white",
    },
    descriptionText: {
        fontStyle: "italic",
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    cards: {
        marginTop: 5,
        maxWidth: 550,
        marginHorizontal: 'auto',
    },
});
