import React from "react";
import {StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native";
import IconButton, {IconType} from "../../button/IconButton";

export interface CardFooterProps {
    sideNumber: number;
    totalSides: number;
    style?: ViewStyle;
    textStyle?: TextStyle;
    onAddSide?: () => void;
}
export const CardFooter = React.memo(function CardFooter(
    {sideNumber, totalSides, style, textStyle, onAddSide}: CardFooterProps
) {
    const footerText = (onAddSide || totalSides > 1) ? `${sideNumber}/${totalSides || 1}` : '';
    return <View style={style}>
        <Text style={textStyle}>{footerText}</Text>
        {onAddSide ? <IconButton
            icon={IconType.Add}
            onClick={onAddSide}
            style={styles.button}
            color="Black"
        /> : null}
    </View>;
});
export default CardFooter

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 2,
        right: 2,
    }
});
