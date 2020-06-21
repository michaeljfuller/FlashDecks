import React from "react";
import {Text, View} from "react-native";
import Typography from '@material-ui/core/Typography';
import DeckViewBase from "./DeckView.common";
import CardView from "../card/CardView";
import Avatar from "../avatar/Avatar";
import Tag from "../tag/Tag";

export interface DeckViewState {}
export default class DeckView extends DeckViewBase<DeckViewState> {
    state: DeckViewState = {};

    render() {
        const deck = this.props.item;

        return <View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>DeckView</Text>
            {this.renderHeader()}
            {this.renderTags()}
            <Text>{deck.description}</Text>
            {this.renderCards()}
        </View>;
    }

    renderHeader() {
        const deck = this.props.item;
        const avatarSize = 35;

        return <View style={{
            height: avatarSize,
            position: 'relative',
        }}>
            <Typography variant="h5" align="center">{deck.name}</Typography>
            <View style={{
                position: 'absolute',
                flexDirection: 'row',
            }}>
                <Avatar user={deck.owner} style={{ size: avatarSize }} />
                <Text style={{
                    marginLeft: 5,
                    lineHeight: avatarSize,
                }}>{deck.owner.displayName}</Text>
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

