import React from 'react';
import {TextStyle} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {Color, getUIColorTheme} from '../../styles/UIColorTheme';
import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
export * from './Button.common';

export function Button(props: ButtonProps) {
    const { onClick, disabled, title } = buttonPropsWithDefaults(props);

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        style={getBackgroundStyle(props)}
    >
        <NativeBaseText style={getTextStyle(props)}>{title}</NativeBaseText>
    </NativeBaseButton>;
}
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(props: ButtonProps): RnViewStyleProp {
    const {color, style, flat} = props;
    const theme = getUIColorTheme(color);
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
    const {color} = props;
    const theme = getUIColorTheme(color);
    return {
        color: theme.secondary.base
    };
}
//</editor-fold>
