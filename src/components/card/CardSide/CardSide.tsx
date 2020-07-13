import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, ViewStyle} from 'react-native';
import {Color} from "../../../styles/Color";
import CardContentView from "../CardContent/CardContent";

export interface CardSideProps {
    side: CardSide;
    style?: ViewStyle|Array<ViewStyle|null|undefined>;
    onPress?: () => void;
}

export function CardSide(props: CardSideProps) {
    const content: CardContent[] = props.side?.content || [];

    return <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={[styles.root, props.style].flat()}>
            {content.map(content => <CardContentView key={content.id} content={content} />)}
        </View>
    </TouchableWithoutFeedback>;
}
export default CardSide;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.White,
        height: '100%',
        justifyContent: "space-around",
    },
});
