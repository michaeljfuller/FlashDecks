import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DeckViewBase from "./DeckView.common";
import Avatar from "../avatar/Avatar";
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
            {this.renderCards()}
            <DeckInfoModal deck={deck} open={this.state.showInfo} onClose={this.closeInfoModal} />
        </View>;
    }

    renderHeader() {
        const deck = this.props.item;

        return <View style={styles.header}>
            <View style={styles.headerItem}>
                <Text style={styles.titleText}>{deck.name}</Text>
            </View>
            <View style={styles.headerItem}>
                <Avatar user={deck.owner} labelPlacement="right" style={{ size: avatarSize, labelColor: 'black' }} />
            </View>
            <View style={styles.headerItem}>
                {this.renderTags()}
            </View>
        </View>;
    }

}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        marginBottom: 5,
    },
    headerItem: {
        flex: 1,
    },
    titleText: {
        textAlign: "center",
        lineHeight: avatarSize,
        fontWeight: 'bold',
    },
    descriptionView: {
        borderWidth: 1,
        padding: 2,
        backgroundColor: 'white',
    },
    descriptionText: {
        fontStyle: "italic",
    },
});
