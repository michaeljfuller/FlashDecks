import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CardView from "../card/CardView";
import {CardCarouselProps} from "./CardCarousel.common";
import Button from "../button/Button";
export * from "./CardCarousel.common";

export function CardCarousel(props: CardCarouselProps) {
    const {cards, style} = props;
    const [index, setIndex] = useState(0);

    if (!cards?.length) {
        return <View style={[styles.root, style]}>
            <Text>No cards found.</Text>
        </View>;
    }
    const card = cards[index];

    return <View style={[styles.root, style]}>
        <Button title="<" onClick={() => setIndex(index-1)} disabled={index <= 0}/>
        <View style={styles.card}>
            <CardView item={card} />
        </View>
        <Button title=">" onClick={() => setIndex(index+1)} disabled={index+1 >= cards.length} />
    </View>;
}
export default CardCarousel;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'red',
    },
    card: {
        marginVertical: "auto",
        flex: 1,
    },
});
