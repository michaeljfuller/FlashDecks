import React from 'react';
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {Icon, IconStyles} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";

export * from './IconButton.common';

export const IconButton = React.memo(function IconButton(props: IconButtonProps) {
    const allProps = iconButtonPropsWithDefaults(props);
    const { onClick, text, disabled, icon, style, transparent } = allProps;

    return <ButtonWrapper style={style}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={getButtonStyle(allProps)}
            transparent={transparent}
            iconLeft
        >
            <Icon type={icon} style={getIconStyle(allProps)} />
            {text ? <NativeBaseText style={getTextStyle(allProps)}>{text}</NativeBaseText> : undefined}
        </NativeBaseButton>
    </ButtonWrapper>;
});
export default IconButton;

function getButtonStyle(
    {width, height, color, invertColor, margin, text, transparent, flat}: Required<IconButtonProps>
): RnViewStyleProp {
    const round = !text;
    const theme = getUIColorTheme(color, invertColor);
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
        return {
            width: width || height || undefined,
            height: height || width || undefined,
            paddingHorizontal: 5,
            backgroundColor: transparent ? undefined : theme.primary.base,
            shadowOpacity: flat ? 0 : undefined,
        };
    }
}
function getIconStyle(
    {color, invertColor, transparent, disabled}: Required<IconButtonProps>
): IconStyles {
    const theme = getUIColorTheme(color, invertColor);
    if (transparent) {
        return { color: disabled ? theme.primary.disabled : theme.primary.base };
    } else {
        return { color: disabled ? theme.secondary.disabled : theme.secondary.base };
    }
}
function getTextStyle(
    {color, invertColor, transparent, disabled}: Required<IconButtonProps>
): IconStyles {
    const theme = getUIColorTheme(color, invertColor);
    if (transparent) {
        return { color: disabled ? theme.primary.disabled : theme.primary.base };
    } else {
        return { color: disabled ? theme.secondary.disabled : theme.secondary.base };
    }
}
