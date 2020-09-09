import React from 'react';
import {View, StyleSheet, Text, FlatList, LayoutChangeEvent, ViewStyle} from 'react-native';
import ImmutablePureComponent from "../ImmutablePureComponent";
import CardView from "../card/CardView";
import {preloadCards} from "../../utils/media/card";
import {CardCarouselProps, resizeCard} from "./CardCarousel.common";
import {CardModel} from "../../models";
import {replaceItem} from "../../utils/array";
import IconButton, {IconType} from "../button/IconButton";
export * from "./CardCarousel.common";

export interface CardCarouselState {
    width: number;
    cardWidth: number;
    cardHeight: number;
}
// Used to restore previous measurements
let cachedWidth = 0;
let cachedCardWidth = 0;
let cachedCardHeight = 0;

export class CardCarousel extends ImmutablePureComponent<CardCarouselProps, CardCarouselState>{
    state = {
        width: cachedWidth,
        cardWidth: cachedCardWidth,
        cardHeight: cachedCardHeight,
    } as Readonly<CardCarouselState>;

    flatList = React.createRef<FlatList>();

    componentDidMount() {
        preloadCards(this.props.cards || []);
    }

    onLayout = (event: LayoutChangeEvent) => {
        const {width, height} = event.nativeEvent.layout;
        const size = resizeCard(width, height, 10, 100);
        this.setStateTo({
            width: cachedWidth = event.nativeEvent.layout.width,
            cardWidth: cachedCardWidth = size.width,
            cardHeight: cachedCardHeight = size.height,
        });
    }

    onUpdateCard = (card: CardModel, index: number) => {
        console.log('CardCarousel', card, index);
        this.props.onCardsChange && this.props.onCardsChange(
            replaceItem(this.props.cards || [], index, card)
        );
    }
    onAddFirstCard = () => {
        this.props.onCardsChange && this.props.onCardsChange([ new CardModel ]);
    }

    render() {
        const {cards, style} = this.props;
        const {width, cardWidth, cardHeight} = this.state;

        if (!cards?.length) {
            return this.renderNoCards();
        }

        const cardStyle = {
            width: cardWidth,
            height: cardHeight,
            marginHorizontal: (width - cardWidth)/2 || 0,
            opacity: cardWidth ? undefined : 0, // Hide until sized
        } as ViewStyle;

        return <View style={[styles.root, style]}>
            <FlatList<CardModel>
                ref={this.flatList}
                data={cards}
                renderItem={({item}) => {
                    return <View key={item.id} style={styles.cardContainer}>
                        <CardView
                            item={item}
                            style={[styles.cardView, cardStyle]}
                            editable={this.props.editable}
                            onUpdate={this.onUpdateCard}
                        />
                    </View>;
                }}
                horizontal
                snapToInterval={width}
                decelerationRate="fast"
                onLayout={this.onLayout}
            />
        </View>;
    }

    renderNoCards() {
        const {style, editable} = this.props;

        return <View style={[styles.root, styles.rootWithoutCards, style]}>{
            editable
                ? <IconButton icon={IconType.Add} text="Add Card" onClick={this.onAddFirstCard} />
                : <Text>No cards found.</Text>
        }</View>;
    }

}
export default CardCarousel;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        paddingBottom: 5,
    },
    rootWithoutCards: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    cardView: {
        minWidth: 250,
        minHeight: 300,
        elevation: 5,
    }
});
