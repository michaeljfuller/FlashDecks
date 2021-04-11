import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
import Icon, {iconStandardSize} from "../icon/Icon";

export * from './Button.common';

export const Button = React.memo<ButtonProps>(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {
        onClick, disabled, title, icon, iconPosition, flat, transparent, square, style, width, height, flex, testID
    } = allProps;

    const iconElement = icon ? <Icon
        type={icon}
        flat={flat || !transparent}
        color={getIconColor(allProps)}
        style={getIconViewStyle(allProps)}
    /> : null;

    return <ButtonWrapper style={style} width={width} height={height} flex={flex}>
        <NativeBaseButton
            testID={testID}
            onPress={onClick}
            disabled={disabled}
            style={[styles.background, getBackgroundStyle(allProps)]}
            rounded={!square}
            transparent={transparent}
        >
            {/* Icon left of text */ icon && title && iconPosition === "left" ? iconElement : null }

            {title ? <NativeBaseText style={getTextStyle(allProps)} uppercase={false}>{title}</NativeBaseText> : null}

            {/* Icon right of text */ icon && title && iconPosition === "right" ? iconElement : null }

            {/* Icon centered without text */ icon && !title ? iconElement : null}

        </NativeBaseButton>
    </ButtonWrapper>;
});
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(
    {color, invertColor, square, flat, transparent, disabled, width, height}: Required<ButtonProps>
): RnViewStyleProp {
    const result: RnViewStyleProp = [];
    if (!transparent) {
        const theme = getUIColorTheme(color, invertColor);
        result.push({ backgroundColor: disabled ? theme.primary.disabled : theme.primary.base });
    }
    if (!flat && !transparent) result.push(styles.backgroundShadow);
    if (square) result.push(styles.backgroundSquare);
    if (width) result.push({ width });
    if (height) result.push({ height });
    return result;
}

function getTextStyle(
    {color, invertColor, flat, transparent, icon, iconPosition}: Required<ButtonProps>
): TextStyle[] {
    const theme = getUIColorTheme(color, invertColor);
    const colorSet = transparent ? theme.primary : theme.secondary;

    const results: TextStyle[] = [{ color: colorSet.base }];
    if (transparent && !flat) results.push(styles.textShadow);
    if (icon) results.push(iconPosition === "right" ? styles.textWithIconRight : styles.textWithIconLeft);

    return results;
}

function getIconViewStyle(
    {title, iconPosition, width, height}: Required<ButtonProps>
): ViewStyle {
    const threshold = iconStandardSize + iconPadding*2;
    if (height < threshold || width < threshold) return styles.iconSmall;
    if (title) return iconPosition === "right" ? styles.iconRight : styles.iconLeft;
    return styles.iconCenter;
}

function getIconColor(
    {color, invertColor, transparent}: Required<ButtonProps>
): string {
    const theme = getUIColorTheme(color, invertColor);
    const colorSet = transparent ? theme.primary : theme.secondary;
    return colorSet.base;
}

const iconPadding = 10, textPadding = 6;

const styles = StyleSheet.create({
    background: {
        flexGrow: 1,
        shadowOffset: { height: 3, width: 3 },
        flex: 1, // Center the text
    },
    backgroundShadow: { // https://ethercreative.github.io/react-native-shadow-generator/
        // iOS: https://reactnative.dev/docs/shadow-props#reference
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        // Android: https://reactnative.dev/docs/view-style-props#elevation
        elevation: 3,
    },
    backgroundSquare: {
        borderRadius: 0,
        justifyContent: "center",
    },
    textShadow: {
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 2,
        textShadowColor: 'rgba(0,0,0,0.2)'
    },
    textWithIconLeft: { paddingLeft: textPadding },
    textWithIconRight: { paddingRight: textPadding },
    iconLeft:   { marginLeft: iconPadding },
    iconRight:  { marginRight: iconPadding },
    iconCenter: { marginHorizontal: iconPadding },
    iconSmall:  { marginHorizontal: 4 },
});

//</editor-fold>
