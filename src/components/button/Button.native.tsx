import React from 'react';
import {TextStyle} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {Color, getUIColorTheme} from "../../styles/UIColorTheme";

export * from './Button.common';

export function Button(props: ButtonProps) {
    const { onClick, disabled, title } = buttonPropsWithDefaults(props);

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        style={getBackgroundStyle(props)}
    >
        <NativeBaseText style={getTextStyle(props)} uppercase={false}>{title}</NativeBaseText>
    </NativeBaseButton>;
}
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(props: ButtonProps): RnViewStyleProp {
    const {color, invertColor, style, flat} = buttonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    return {
        width: style?.width,
        height: style?.height,
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
        color: theme.secondary.base
    };
}
//</editor-fold>
