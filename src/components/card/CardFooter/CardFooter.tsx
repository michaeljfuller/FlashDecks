import React from "react";
import {StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native";
import IconButton, {IconType} from "../../button/IconButton";

export interface CardFooterProps {
    sideNumber: number;
    totalSides: number;
    style?: ViewStyle;
    textStyle?: TextStyle;
    onAddSide?: () => void;
    onRemoveSide?: () => void;
}
export const CardFooter = React.memo(function CardFooter(
    {sideNumber, totalSides, style, textStyle, onAddSide, onRemoveSide}: CardFooterProps
) {
    const footerText = (onAddSide || totalSides > 1) ? `${sideNumber}/${totalSides || 1}` : '';
    return <View style={style}>
        <Text style={textStyle}>{footerText}</Text>
        <View style={styles.actions}>
            {onAddSide ? <IconButton
                icon={IconType.Add}
                onClick={onAddSide}
                color="Black"
                style={styles.button}
            /> : null}
            {onRemoveSide ? <IconButton
                icon={IconType.Remove}
                onClick={onRemoveSide}
                color="Black"
                style={styles.button}
            /> : null}
        </View>
    </View>;
});
export default CardFooter

const styles = StyleSheet.create({
    actions: {
        position: "absolute",
        flexDirection: "row",
        bottom: 2,
        right: 2,
    },
    button: {
        marginLeft: 1,
    },
});
