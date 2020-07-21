import React from 'react';
import {View, StyleSheet, Text, Animated, LayoutChangeEvent} from 'react-native';
import {isPlatformWeb} from "../../platform";
import CardView from "../card/CardView";
import {CardCarouselProps} from "./CardCarousel.common";
import Button from "../button/Button";
import {UIColorThemeMap} from "../../styles/UIColorTheme";
import {preloadCards} from "../../utils/media/card";
export * from "./CardCarousel.common";

const useNativeDriver = !isPlatformWeb;
const theme = UIColorThemeMap.Orange;

interface CardCarouselState {
    index: number;
    isAnimating: boolean;
    cardWidth: number;
    cardHeight: number;
}
export class CardCarousel extends React.Component<CardCarouselProps, CardCarouselState>{
    state = {
        index: 0,
        isAnimating: false,
        cardWidth: 0,
        cardHeight: 0,
    } as CardCarouselState;

    get canGoToPrevious() {
        return !this.state.isAnimating && this.state.index > 0;
    }
    get canGoToNext() {
        return !this.state.isAnimating && this.state.index + 1 < (this.props.cards||[]).length;
    }

    // https://reactnative.dev/docs/animations
    cardOpacity = new Animated.Value(1);
    cardPosition = new Animated.Value(0);

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
        preloadCards(this.props.cards || []);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    onLayout = (event: LayoutChangeEvent) => {
        let {width, height} = event.nativeEvent.layout;

        const cardMargin = 10;
        width -= cardMargin * 2;
        height -= cardMargin * 2;

        const minSize = 100;
        width = Math.max(width, minSize);
        height = Math.max(height, minSize);

        const cardAspectRatio = 0.7;
        if (width / cardAspectRatio > height) {
            width = height * cardAspectRatio;
        } else {
            height = width / cardAspectRatio;
        }

        this.setState({ cardWidth: width, cardHeight: height });
    };

    onKeyDown = (event: KeyboardEvent) => {
        switch (event.code) {
            case "ArrowLeft": return this.previous();
            case "ArrowRight": return this.next();
        }
    }

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
        if (this.canGoToNext) {
            this.setState({isAnimating: true});
            await this.cardOut(-300);
            this.setState({index: this.state.index + 1});
            await this.cardIn(300);
            this.setState({isAnimating: false});
        }
    };

    previous = async () => {
        if (this.canGoToPrevious) {
            this.setState({isAnimating: true});
            await this.cardOut(300);
            this.setState({ index: this.state.index - 1 });
            await this.cardIn(-300);
            this.setState({isAnimating: false});
        }
    };

    render() {
        const {cards, style} = this.props;
        const {index, cardWidth, cardHeight} = this.state;

        if (!cards?.length) {
            return <View style={[styles.root, style]}>
                <Text>No cards found.</Text>
            </View>;
        }

        return <View style={[styles.root, style]} onLayout={this.onLayout}>
            <Button title="<" onClick={this.previous} disabled={!this.canGoToPrevious} square flat color={theme} />
            <View style={styles.cardContainer}>
                <Animated.View style={{
                    opacity: this.cardOpacity,
                    [isPlatformWeb ? 'left' : 'translateX']: this.cardPosition,
                }}>
                    <CardView
                        item={cards[index]}
                        style={[styles.cardView, { width: cardWidth, height: cardHeight }]}
                        editable={this.props.editable}
                    />
                </Animated.View>
            </View>
            <Button title=">" onClick={this.next} disabled={!this.canGoToNext} square flat color={theme} />
        </View>;
    }
}
export default CardCarousel;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        height: "100%",
        backgroundColor: theme.primary.disabled,
    },
    cardContainer: {
        marginVertical: "auto",
        flex: 1,
        overflow: "hidden",
        width: "100%",
        alignItems: "center",
        paddingVertical: 5,
    },
    cardView: {}
});
