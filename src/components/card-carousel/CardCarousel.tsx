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
    isAnimating: boolean;
}
export class CardCarousel extends React.Component<CardCarouselProps, CardCarouselState>{
    state = {
        index: 0,
        isAnimating: false
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
        if (!this.state.isAnimating) {
            this.setState({isAnimating: true});
            await this.cardOut(-300);
            this.setState({index: this.state.index + 1});
            await this.cardIn(300);
            this.setState({isAnimating: false});
        }
    };

    previous = async () => {
        if (!this.state.isAnimating) {
            await this.cardOut(300);
            this.setState({ index: this.state.index - 1 });
            await this.cardIn(-300);
        }
    };

    render() {
        const {cards, style} = this.props;
        const {index, isAnimating} = this.state;

        if (!cards?.length) {
            return <View style={[styles.root, style]}>
                <Text>No cards found.</Text>
            </View>;
        }
        const card = cards[index];

        return <View style={[styles.root, style]}>
            <Button title="<" onClick={this.previous} disabled={index <= 0 || isAnimating}/>
            <View style={styles.cardContainer}>
                <Animated.View style={{
                    opacity: this.cardOpacity,
                    [isPlatformWeb ? 'left' : 'translateX']: this.cardPosition,
                }}>
                    <CardView item={card} style={styles.cardView} />
                </Animated.View>
            </View>
            <Button title=">" onClick={this.next} disabled={index + 1 >= cards.length || isAnimating}/>
        </View>;
    }
}
export default CardCarousel;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
    },
    cardContainer: {
        marginVertical: "auto",
        flex: 1,
        overflow: "hidden",
        width: "100%",
        alignItems: "center",
    },
    cardView: {
        minWidth: 250,
        minHeight: 300,
        backgroundColor: 'red',
    }
});
