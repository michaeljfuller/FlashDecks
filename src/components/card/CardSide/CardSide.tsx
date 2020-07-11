import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet, ViewStyle} from 'react-native';
import {Color} from "../../../styles/Color";

export interface CardSideProps {
    side: CardSide;
    style?: ViewStyle;
    onPress?: () => void;
}

export function CardSide(props: CardSideProps) {
    return <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.root, props.style]}>
                <Text selectable={false}>{JSON.stringify(props.side, null, 2)}</Text>
            </View>
        </TouchableWithoutFeedback>;
}
export default CardSide;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.Red,
        height: '100%',
    }
});
