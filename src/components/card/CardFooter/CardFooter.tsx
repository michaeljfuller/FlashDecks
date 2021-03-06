import React from "react";
import {StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native";
import IconButton, {IconType} from "../../button/IconButton";
import {padNumber} from "../../../utils/string";

export interface CardFooterProps {
    sideNumber: number;
    totalSides: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    onAddSide?: () => void;
    onRemoveSide?: () => void;
    disabled?: boolean;
}
export const CardFooter = React.memo(function CardFooter(
    {sideNumber, totalSides, style, textStyle, onAddSide, onRemoveSide, disabled}: CardFooterProps
) {
    let footerText = '';
    if (onAddSide || totalSides > 1) {
        const digits = totalSides.toString().length;
        footerText = `Side: ${padNumber(sideNumber || 1, digits)}/${Math.max(totalSides, 1)}`;
    }
    return <View style={style}>
        <Text style={textStyle}>{footerText}</Text>
        <View style={styles.actions}>
            {onAddSide ? <IconButton
                icon={IconType.Add}
                onClick={onAddSide}
                color="Black"
                style={styles.button}
                disabled={disabled}
            /> : null}
            {onRemoveSide ? <IconButton
                icon={IconType.Remove}
                onClick={onRemoveSide}
                color="Black"
                style={styles.button}
                disabled={disabled}
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
