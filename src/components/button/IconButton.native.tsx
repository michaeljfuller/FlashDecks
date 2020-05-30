import React from 'react';
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {Icon, IconStyles} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults, IconButtonStyle} from './IconButton.common';
import {getUIColorTheme, UIColorTheme} from "../../styles/UIColorTheme";
import {TextStyle} from "react-native";
export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, text, disabled, icon, style, transparent, color } = iconButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color);

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        style={getButtonStyle(style, theme, transparent)}
        transparent={transparent}
        iconLeft
    >
        <Icon type={icon} style={getIconStyle(theme, transparent)} />
        {text ? <NativeBaseText style={getTextStyle(theme, transparent)}>{text}</NativeBaseText> : undefined}
    </NativeBaseButton>
}
export default IconButton;

function getButtonStyle(style: IconButtonStyle, theme: UIColorTheme, transparent: boolean): RnViewStyleProp {
    return {
        width: style.width,
        height: style.height,
        paddingHorizontal: 5,
        backgroundColor: transparent ? undefined : theme.primary.base
    };
}
function getIconStyle(theme: UIColorTheme, transparent: boolean): IconStyles {
    return { color: transparent ? theme.primary.base : theme.secondary.base };
}
function getTextStyle(theme: UIColorTheme, transparent: boolean): TextStyle {
    return { color: transparent ? theme.primary.base : theme.secondary.base };
}
