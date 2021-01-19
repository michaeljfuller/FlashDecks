import React from 'react';
import {View, StyleSheet, Text, FlatList, LayoutChangeEvent, ViewStyle} from 'react-native';
import CardView from "../card/CardView";
import {preloadCards} from "../../utils/media/card";
import {CardCarouselBase, CardCarouselBaseState, resizeCard} from "./CardCarousel.common";
import {CardModel} from "../../models";
import Button, {IconType} from "../button/Button";
import {Visibility} from "../layout/Visibility";
export * from "./CardCarousel.common";

export interface CardCarouselState extends CardCarouselBaseState {
    width: number;
    cardWidth: number;
    cardHeight: number;
}

export class CardCarousel extends CardCarouselBase<CardCarouselState>{
    state = {
        width: 0,
        cardWidth: 0,
        cardHeight: 0,
        showCreateCardModal: false,
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
            width: event.nativeEvent.layout.width,
            cardWidth: size.width,
            cardHeight: size.height,
        });
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
        } as ViewStyle;

        return <Visibility visible={width > 0} style={[styles.root, style]}>
            <FlatList<CardModel>
                ref={this.flatList}
                data={cards}
                keyExtractor={item => item.transientKey}
                renderItem={({item, index}) => {
                    this.index = index;
                    return <View style={styles.cardContainer}>
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
        </Visibility>;
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
