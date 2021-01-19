import React from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {isPlatformWeb} from "../../platform";
import CardView from "../card/CardView";
import {CardCarouselBase, CardCarouselBaseState, resizeCard} from "./CardCarousel.common";
import Button, {IconType} from "../button/Button";
import {UIColorThemeMap} from "../../styles/UIColorTheme";
import {preloadCards} from "../../utils/media/card";
import withDefaultProps from "../../utils/hoc/withDefaultProps/withDefaultProps";

export * from "./CardCarousel.common";

const useNativeDriver = !isPlatformWeb;
const theme = UIColorThemeMap.Orange;

interface CardCarouselState extends CardCarouselBaseState{
    index: number;
    isAnimating: boolean;
    cardWidth: number;
    cardHeight: number;
}
export class CardCarousel extends CardCarouselBase<CardCarouselState>{
    state = {
        index: 0,
        isAnimating: false,
        cardWidth: 0,
        cardHeight: 0,
        showCreateCardModal: false,
    } as Readonly<CardCarouselState>;

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
        this.setIndex(0); // TODO Add/update routing for card index?
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    onLayout = (event: LayoutChangeEvent) => {
        const {width, height} = event.nativeEvent.layout;
        const size = resizeCard(width, height, 10, 100);
        this.setStateTo({ cardWidth: size.width, cardHeight: size.height });
    };

    onKeyDown = (event: KeyboardEvent) => {
        if (!this.props.editable) {
            switch (event.code) {
                case "ArrowLeft": return this.previous();
                case "ArrowRight": return this.next();
            }
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
            this.setStateTo({isAnimating: true});
            await this.cardOut(-300);
            this.setIndex(this.state.index + 1);
            await this.cardIn(300);
            this.setStateTo({isAnimating: false});
        }
    };

    previous = async () => {
        if (this.canGoToPrevious) {
            this.setStateTo({isAnimating: true});
            await this.cardOut(300);
            this.setIndex(this.state.index - 1);
            await this.cardIn(-300);
            this.setStateTo({isAnimating: false});
        }
    };

    setIndex(index: number) {
        this.setStateTo({ index });
        this.props.onScrollCards && this.props.onScrollCards(index);
    }

    render() {
        const {cards, style} = this.props;
        const {index, cardWidth, cardHeight} = this.state;
        if (!cards?.length) {
            return this.renderNoCards();
        }

        return <View style={[styles.root, style]} onLayout={this.onLayout}>
            <CarouselButton title="<" onClick={this.previous} disabled={!this.canGoToPrevious} />
            <View style={styles.cardContainer}>
                <Animated.View style={{
                    opacity: this.cardOpacity,
                    [isPlatformWeb ? 'left' : 'translateX']: this.cardPosition,
                }}>
                    <CardView
                        item={cards[index]}
                        style={[styles.cardView, { width: cardWidth, height: cardHeight }]}
                        editable={this.props.editable}
                        onUpdate={this.onSetCard}
                    />
                </Animated.View>
            </View>
            <CarouselButton title=">" onClick={this.next} disabled={!this.canGoToNext} />
        </View>;
    }

    renderNoCards() {
        const {style, editable} = this.props;

        return <React.Fragment>
            <View style={[styles.root, styles.rootWithoutCards, style]}>{
                editable
                ? <Button icon={IconType.Add} title="Add Card" onClick={this.onShowCreateCardModal} />
                : <Text>No cards found.</Text>
            }</View>
            {this.renderCreateCardModal()}
        </React.Fragment>;
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
    rootWithoutCards: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        marginVertical: "auto",
        flex: 1,
        overflow: "hidden",
        width: "100%",
        alignItems: "center",
        paddingVertical: 5,
    },
    cardView: {},
    carouselButton: {
        height: '100%',
    },
});

const CarouselButton = withDefaultProps(Button, {
    square: true,
    flat: true,
    color: theme,
    style: styles.carouselButton
}, null, 'CarouselButton');
