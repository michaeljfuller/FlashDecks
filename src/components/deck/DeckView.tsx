import React from "react";
import {Text, View} from "react-native";
import DeckViewBase from "./DeckView.common";
import CardView from "../card/CardView";
import Avatar from "../avatar/Avatar";
import Tag from "../tag/Tag";
import IconButton, {IconType} from "../button/IconButton";
import {DeckInfoModal} from "./DeckInfoModal/DeckInfoModal";

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
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>DeckView</Text>
            {this.renderHeader()}
            {this.renderTags()}
            <Text>{deck.description}</Text>
            {this.renderCards()}
            <DeckInfoModal deck={deck} open={this.state.showInfo} onClose={this.closeInfoModal} />
        </View>;
    }

    renderHeader() {
        const deck = this.props.item;
        const avatarSize = 35;

        return <View style={{
            height: avatarSize,
            position: 'relative',
        }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 'auto' }}>
                <Text>{deck.name}</Text>
                <View style={{ marginLeft: 5 }}>
                    <IconButton flat icon={IconType.Info} onClick={this.openInfoModal} />
                </View>
            </View>
            <View style={{
                position: 'absolute',
                flexDirection: 'row',
            }}>
                <Avatar user={deck.owner} style={{ size: avatarSize, labelColor: 'black' }} labelPlacement="right" />
            </View>
        </View>;
    }

    renderTags() {
        const {tags} = this.props.item;

        if (tags && tags.length) {
            return <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
            }}>
                {tags.map(tag => <Tag key={tag} value={tag} />)}
            </View>
        }
        return null;
    }

    renderCards() {
        return (this.props.item.cards||[]).map(card => {
            return <View
                key={card.id}
                style={{
                    marginTop: 5,
                    maxWidth: 550,
                    marginHorizontal: 'auto',
                }}
            >
                <CardView item={card} />
            </View>
        });
    }
}

