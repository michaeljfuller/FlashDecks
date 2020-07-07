import React from 'react';
import {View, StyleSheet, Text, FlatList, LayoutChangeEvent} from 'react-native';
import CardView from "../card/CardView";
import {CardCarouselProps} from "./CardCarousel.common";
export * from "./CardCarousel.common";

export interface CardCarouselState {
    width: number;
}
export class CardCarousel extends React.Component<CardCarouselProps, CardCarouselState>{
    state = {
        width: 0,
    } as CardCarouselState;

    flatList = React.createRef<FlatList>();

    onLayout = (event: LayoutChangeEvent) => {
        this.setState({ width: event.nativeEvent.layout.width });
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
            <FlatList<Card>
                ref={this.flatList}
                data={cards}
                renderItem={({item}) => {
                    return <View key={item.id} style={[styles.cardContainer, { width }]}>
                        <CardView item={item} style={styles.cardView} />
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
    },
    cardView: {
        minWidth: 250,
        minHeight: 300,
    }
});
