import React from 'react';
import {View, StyleSheet} from 'react-native';
import CardView from "../card/CardView";
import {CardCarouselProps} from "./CardCarousel.common";
export * from "./CardCarousel.common";

export function CardCarousel(props: CardCarouselProps) {
    const {cards, style} = props;
    return <View style={[styles.root, style]}>
        {(cards||[]).map(card => {
            return <View key={card.id} style={{ margin: 2 }}>
                <CardView item={card} />
            </View>;
        })}
    </View>;
}
export default CardCarousel;

const styles = StyleSheet.create({
    root: {
        borderWidth: 1,
    },
});
