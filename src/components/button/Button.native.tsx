import React from 'react';
import {StyleSheet, TextStyle, View} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {ButtonProps, buttonPropsWithDefaults, StandardButtonWrapper} from './Button.common';
import {Color, getUIColorTheme} from "../../styles/UIColorTheme";
import Icon, {IconStyles} from "../icon/Icon";

export * from './Button.common';

export const Button = React.memo<ButtonProps>(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {onClick, disabled, title, icon, iconPosition, square} = allProps;

    return <StandardButtonWrapper buttonProps={allProps}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={[styles.background, getBackgroundStyle(allProps)]}
            rounded={!square}
        >
            {icon && iconPosition === "left" ? <View style={[styles.iconPadLeft, !title && styles.iconPadRight]}>
                <Icon type={icon} style={getIconStyle(allProps)} />
            </View> : null}
            {title ? <NativeBaseText style={getTextStyle(allProps)} uppercase={false}>{title}</NativeBaseText> : null}
            {icon && iconPosition === "right" ? <View style={[!title && styles.iconPadLeft, styles.iconPadRight]}>
                <Icon type={icon} style={getIconStyle(allProps)} />
            </View> : null}
        </NativeBaseButton>
    </StandardButtonWrapper>;
});
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(
    {color, invertColor, /*flat, */disabled}: Required<ButtonProps>
): RnViewStyleProp {
    const theme = getUIColorTheme(color, invertColor);
    return {
        backgroundColor: disabled ? theme.primary.disabled : theme.primary.base,

        // TODO handle shadow/flat
        shadowColor: Color.Black,
        // shadowOpacity: 100,
    };
}

function getTextStyle(
    {color, invertColor}: Required<ButtonProps>
): TextStyle {
    const theme = getUIColorTheme(color, invertColor);
    return { color: theme.secondary.base };
}

function getIconStyle(
    {color, invertColor}: Required<ButtonProps>
): IconStyles {
    const theme = getUIColorTheme(color, invertColor);
    return { color: theme.secondary.base };
}

const styles = StyleSheet.create({
    background: {
        flexGrow: 1,
        shadowOffset: { height: 3, width: 3 },
    },
    iconPadLeft:  { paddingLeft:  15 },
    iconPadRight: { paddingRight: 15 },
});

//</editor-fold>
