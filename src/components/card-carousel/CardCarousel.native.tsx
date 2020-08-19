import React from 'react';
import {View, StyleSheet, Text, FlatList, LayoutChangeEvent} from 'react-native';
import ImmutablePureComponent from "../ImmutablePureComponent";
import CardView from "../card/CardView";
import {preloadCards} from "../../utils/media/card";
import {CardCarouselProps} from "./CardCarousel.common";
import {CardModel} from "../../models";
import {replaceItem} from "../../utils/array";
export * from "./CardCarousel.common";

export interface CardCarouselState {
    width: number;
}
export class CardCarousel extends ImmutablePureComponent<CardCarouselProps, CardCarouselState>{
    state = {
        width: 0,
    } as Readonly<CardCarouselState>;

    flatList = React.createRef<FlatList>();

    componentDidMount() {
        preloadCards(this.props.cards || []);
    }

    onLayout = (event: LayoutChangeEvent) => {
        this.setStateTo({ width: event.nativeEvent.layout.width });
    }

    onUpdateCard = (card: CardModel, index: number) => {
        console.log('CardCarousel', card, index);
        this.props.onCardsChange && this.props.onCardsChange(
            replaceItem(this.props.cards || [], index, card)
        );
    }

    render() {
        const {cards, style} = this.props;
        const {width} = this.state;

        if (!cards?.length) {
            return <View style={[styles.root, style]}>
                <Text>No cards found.</Text>
            </View>;
        }

        return <View style={[styles.root, style]}>
            <FlatList<CardModel>
                ref={this.flatList}
                data={cards}
                renderItem={({item}) => {
                    return <View key={item.id} style={[styles.cardContainer, { width }]}>
                        <CardView
                            item={item}
                            style={styles.cardView}
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
}
export default CardCarousel;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        paddingBottom: 5,
    },
    cardContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    cardView: {
        minWidth: 250,
        minHeight: 300,
        elevation: 5,
    }
});
