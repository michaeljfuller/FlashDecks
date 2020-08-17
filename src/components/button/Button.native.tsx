import React from 'react';
import {TextStyle} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {Color, getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";

export * from './Button.common';

export function Button(props: ButtonProps) {
    const { onClick, disabled, title, square, style } = buttonPropsWithDefaults(props);

    return <ButtonWrapper style={style}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={getBackgroundStyle(props)}
            rounded={!square}
        >
            <NativeBaseText style={getTextStyle(props)} uppercase={false}>{title}</NativeBaseText>
        </NativeBaseButton>
    </ButtonWrapper>;
}
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(props: ButtonProps): RnViewStyleProp {
    const {color, invertColor, flat, width, height} = buttonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    return {
        width: numberOrDefault(width, undefined),
        height: numberOrDefault(height, undefined),
        backgroundColor: theme.primary.base,

        // TODO handle shadow/flat
        shadowOffset: { height: 3, width: 3 },
        shadowColor: Color.Black,
        // shadowOpacity: 100,
    };
}
function getTextStyle(props: ButtonProps): TextStyle {
    const {color, invertColor} = buttonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    return {
        color: theme.secondary.base,
        width: '100%',
    };
}
//</editor-fold>
