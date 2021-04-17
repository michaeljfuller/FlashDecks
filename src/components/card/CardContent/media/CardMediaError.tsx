import React from "react";
import {Text, StyleSheet} from "react-native";
import {Color} from "../../../../styles/Color";

export interface CardMediaErrorProps {
    message: string;
    height?: number;
}

export const CardMediaError = React.memo(function CardMediaError(props: CardMediaErrorProps) {
    return <Text style={[
        styles.error,
        { lineHeight: props.height }
    ]}>
        {props.message}
    </Text>;
});
export default CardMediaError;

const styles = StyleSheet.create({
    error: {
        color: Color.White,
        backgroundColor: Color.Red,
        textAlign: "center",
    },
});
