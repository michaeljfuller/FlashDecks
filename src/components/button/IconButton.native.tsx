import React from 'react';
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {Icon, IconStyles} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
import {getUIColorTheme, UIColorTheme} from "../../styles/UIColorTheme";
import {TextStyle} from "react-native";
import {numberOrDefault} from "../../utils/math";

export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, text, disabled, icon, style, transparent, flat, color, invertColor, width, height, margin } = iconButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    const round = !text;

    return <ButtonWrapper style={style}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={getButtonStyle(width, height, margin, theme, !!text, transparent, flat, round)}
            transparent={transparent}
            iconLeft
        >
            <Icon type={icon} style={getIconStyle(theme, transparent, disabled)} />
            {text ? <NativeBaseText style={getTextStyle(theme, transparent, disabled)}>{text}</NativeBaseText> : undefined}
        </NativeBaseButton>
    </ButtonWrapper>;
}
export default IconButton;

function getButtonStyle(
    width: number,
    height: number,
    margin: number,
    theme: UIColorTheme,
    hasText: boolean,
    transparent: boolean,
    flat: boolean,
    round: boolean
): RnViewStyleProp {
    if (round) {
        const defaultSize = 24;
        const btnWidth = width || height || defaultSize;
        const btnHeight = height || width || defaultSize;
        return {
            width: btnWidth,
            height: btnHeight,
            margin: numberOrDefault(margin, undefined),
            backgroundColor: transparent ? undefined : theme.primary.base,
            borderRadius: Math.min(btnWidth, btnHeight),
            justifyContent: 'center',
            shadowOpacity: flat ? 0 : undefined,
        };
    } else {
        const defaultSize = hasText ? undefined : 24;
        return {
            width: width || height || defaultSize,
            height: height || width ||  defaultSize,
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
