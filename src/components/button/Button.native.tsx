import React from 'react';
import {StyleSheet, TextStyle, View} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {ButtonProps, buttonPropsWithDefaults, StandardButtonWrapper} from './Button.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
import Icon, {IconStyles} from "../icon/Icon";
import Row from "../layout/Row";

export * from './Button.common';

export const Button = React.memo<ButtonProps>(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {onClick, disabled, title, icon, iconPosition, square, flat, transparent} = allProps;

    const iconShadow = transparent && !flat ? styles.iconShadow : null;
    const iconElement = icon ? <Icon type={icon} flat={flat || !transparent} style={getIconStyle(allProps)} /> : null;

    return <StandardButtonWrapper buttonProps={allProps}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={[styles.background, getBackgroundStyle(allProps)]}
            rounded={!square}
            transparent={transparent}
        >
            {/* Icon left of text */
                icon && title && iconPosition === "left" ?
                <View style={[iconShadow, styles.iconLeft]}>{iconElement}</View> : null
            }

            {title ? <NativeBaseText style={getTextStyle(allProps)} uppercase={false}>{title}</NativeBaseText> : null}

            {/* Icon right of text */
                icon && title && iconPosition === "right" ?
                <View style={[iconShadow, styles.iconRight]}>{iconElement}</View> : null
            }

            {/* Icon centered without text */
                icon && !title ?
                <Row center flex style={[iconShadow, styles.iconCenter]}>{iconElement}</Row> : null
            }

        </NativeBaseButton>
    </StandardButtonWrapper>;
});
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(
    {color, invertColor, flat, transparent, disabled}: Required<ButtonProps>
): RnViewStyleProp {
    const result: RnViewStyleProp = [];
    if (!transparent) {
        const theme = getUIColorTheme(color, invertColor);
        result.push({ backgroundColor: disabled ? theme.primary.disabled : theme.primary.base });
    }
    if (!flat && !transparent) result.push(styles.backgroundShadow);
    return result;
}

function getTextStyle(
    {color, invertColor, flat, transparent}: Required<ButtonProps>
): TextStyle[] {
    const theme = getUIColorTheme(color, invertColor);
    const colorSet = transparent ? theme.primary : theme.secondary;
    const results: TextStyle[] = [{ color: colorSet.base }];
    if (transparent && !flat) results.push(styles.textShadow);
    return results;
}

function getIconStyle(
    {color, invertColor, transparent}: Required<ButtonProps>
): IconStyles {
    const theme = getUIColorTheme(color, invertColor);
    const colorSet = transparent ? theme.primary : theme.secondary;
    return { color: colorSet.base };
}

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
    textShadow: {
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 2,
        textShadowColor: 'rgba(0,0,0,0.2)'
    },
    iconShadow: {
    },
    iconLeft:   { paddingLeft: 12 },
    iconRight:  { paddingRight: 12 },
    iconCenter: { paddingHorizontal: 12 },
});

//</editor-fold>
