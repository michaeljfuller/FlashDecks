import React from 'react';
import {View, StyleSheet, Text, FlatList, LayoutChangeEvent, ViewStyle} from 'react-native';
import CardView from "../card/CardView";
import {preloadCards} from "../../utils/media/card";
import {CardCarouselBase, CardCarouselBaseState, resizeCard} from "./CardCarousel.common";
import {CardModel} from "../../models";
import IconButton, {IconType} from "../button/IconButton";
export * from "./CardCarousel.common";

export interface CardCarouselState extends CardCarouselBaseState {
    width: number;
    cardWidth: number;
    cardHeight: number;
}
// Used to restore previous measurements
let cachedWidth = 0;
let cachedCardWidth = 0;
let cachedCardHeight = 0;

export class CardCarousel extends CardCarouselBase<CardCarouselState>{
    state = {
        width: cachedWidth,
        cardWidth: cachedCardWidth,
        cardHeight: cachedCardHeight,
    } as Readonly<CardCarouselState>;

    get index() { return this._index; }
    set index(num: number) {
        if (num !== this._index) {
            this._index = num;
            this.props.onScrollCards && this.props.onScrollCards(num);
        }
    }
    private _index = -1;

    flatList = React.createRef<FlatList>();

    componentDidMount() {
        preloadCards(this.props.cards || []);
        this.index = 0;
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

    render() {
        const {cards, style} = this.props;
        const {width, cardWidth, cardHeight} = this.state;

        if (!cards?.length) {
            return [this.renderNoCards(), this.renderCreateCardModal()];
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
                renderItem={({item, index}) => {
                    this.index = index;
                    return <View key={item.id} style={styles.cardContainer}>
                        <CardView
                            item={item}
                            style={[styles.cardView, cardStyle]}
                            editable={this.props.editable}
                            onUpdate={this.onSetCard}
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
                ? <IconButton icon={IconType.Add} text="Add Card" onClick={this.onShowCreateCardModal} />
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
