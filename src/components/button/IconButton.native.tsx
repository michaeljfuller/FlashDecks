import React from 'react';
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {Icon, IconStyles} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults, IconButtonStyle} from './IconButton.common';
import {getUIColorTheme, UIColorTheme} from "../../styles/UIColorTheme";
import {TextStyle} from "react-native";

export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, text, disabled, icon, style, transparent, flat, color, invertColor } = iconButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    const round = !text;

    return <ButtonWrapper>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={getButtonStyle(style, theme, !!text, transparent, flat, round)}
            transparent={transparent}
            iconLeft
        >
            <Icon type={icon} style={getIconStyle(theme, transparent, disabled)} />
            {text ? <NativeBaseText style={getTextStyle(theme, transparent, disabled)}>{text}</NativeBaseText> : undefined}
        </NativeBaseButton>
    </ButtonWrapper>;
}
export default IconButton;

function getButtonStyle(style: IconButtonStyle, theme: UIColorTheme, hasText: boolean, transparent: boolean, flat: boolean, round: boolean): RnViewStyleProp {
    if (round) {
        const defaultSize = 24;
        const width = style.width || style.height || defaultSize;
        const height = style.height || style.width || defaultSize;
        const margin = style.margin;
        return {
            width,
            height,
            margin,
            backgroundColor: transparent ? undefined : theme.primary.base,
            borderRadius: Math.min(width, height),
            justifyContent: 'center',
            shadowOpacity: flat ? 0 : undefined,
        };
    } else {
        const defaultSize = hasText ? undefined : 24;
        return {
            width: style.width || style.height || defaultSize,
            height: style.height || style.width ||  defaultSize,
            paddingHorizontal: 5,
            backgroundColor: transparent ? undefined : theme.primary.base,
            shadowOpacity: flat ? 0 : undefined,
        };
    }
}
function getIconStyle(theme: UIColorTheme, transparent: boolean, disabled: boolean): IconStyles {
    if (transparent) {
        return { color: disabled ? theme.primary.disabled : theme.primary.base };
    } else {
        return { color: disabled ? theme.secondary.disabled : theme.secondary.base };
    }
}
function getTextStyle(theme: UIColorTheme, transparent: boolean, disabled: boolean): TextStyle {
    if (transparent) {
        return { color: disabled ? theme.primary.disabled : theme.primary.base };
    } else {
        return { color: disabled ? theme.secondary.disabled : theme.secondary.base };
    }
}
