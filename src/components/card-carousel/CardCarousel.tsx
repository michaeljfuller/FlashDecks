import React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {isPlatformWeb} from "../../platform";
import CardView from "../card/CardView";
import {CardCarouselProps} from "./CardCarousel.common";
import Button from "../button/Button";
export * from "./CardCarousel.common";

const useNativeDriver = !isPlatformWeb;

interface CardCarouselState {
    index: number;
}
export class CardCarousel extends React.Component<CardCarouselProps, CardCarouselState>{
    state = {
        index: 0,
    } as CardCarouselState;

    // https://reactnative.dev/docs/animations
    cardOpacity = new Animated.Value(1);
    cardPosition = new Animated.Value(0);

    async cardOut(endPosition: number, duration = 250) {
        return new Promise(resolve => {
            Animated.parallel([
                Animated.timing(this.cardOpacity, { toValue: 0, duration, useNativeDriver }),
                Animated.timing(this.cardPosition, { toValue: endPosition, duration, useNativeDriver }),
            ]).start(resolve);
        });
    }
    async cardIn(startPosition: number, duration = 250) {
        return new Promise(resolve => {
            Animated.sequence([
                Animated.timing(this.cardPosition, {toValue: startPosition, duration: 0, useNativeDriver}),
                Animated.parallel([
                    Animated.timing(this.cardOpacity, {toValue: 1, duration, useNativeDriver}),
                    Animated.timing(this.cardPosition, {toValue: 0, duration, useNativeDriver}),
                ]),
            ]).start(resolve);
        });
    }

    next = async () => {
        await this.cardOut(-300);
        this.setState({ index: this.state.index + 1 });
        await this.cardIn(300);
    };

    previous = async () => {
        await this.cardOut(300);
        this.setState({ index: this.state.index - 1 });
        await this.cardIn(-300);
    };

    render() {
        const {cards, style} = this.props;
        const {index} = this.state;

        if (!cards?.length) {
            return <View style={[styles.root, style]}>
                <Text>No cards found.</Text>
            </View>;
        }
        const card = cards[index];

        return <View style={[styles.root, style]}>
            <Button title="<" onClick={this.previous} disabled={index <= 0}/>
            <View style={styles.cardContainer}>
                <Animated.View style={{
                    opacity: this.cardOpacity,
                    [isPlatformNative ? 'translateX' : 'left']: this.cardPosition,
                }}>
                    <CardView item={card}/>
                </Animated.View>
            </View>
            <Button title=">" onClick={this.next} disabled={index + 1 >= cards.length}/>
        </View>;
    }
}
export default CardCarousel;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'red',
    },
    cardContainer: {
        marginVertical: "auto",
        flex: 1,
        overflow: "hidden",
    },
});
