import React from 'react';
import {TextStyle} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {Color, getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";

export * from './Button.common';

export const Button = React.memo(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const { onClick, disabled, title, square, style } = allProps;

    return <ButtonWrapper style={style}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={getBackgroundStyle(allProps)}
            rounded={!square}
        >
            <NativeBaseText style={getTextStyle(allProps)} uppercase={false}>{title}</NativeBaseText>
        </NativeBaseButton>
    </ButtonWrapper>;
});
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(
    {color, invertColor, /*flat, */width, height, disabled}: Required<ButtonProps>
): RnViewStyleProp {
    const theme = getUIColorTheme(color, invertColor);
    return {
        width: numberOrDefault(width, undefined),
        height: numberOrDefault(height, undefined),
        backgroundColor: disabled ? theme.primary.disabled : theme.primary.base,

        // TODO handle shadow/flat
        shadowOffset: { height: 3, width: 3 },
        shadowColor: Color.Black,
        // shadowOpacity: 100,
    };
}
function getTextStyle(
    {color, invertColor}: Required<ButtonProps>
): TextStyle {
    const theme = getUIColorTheme(color, invertColor);
    return {
        color: theme.secondary.base,
        width: '100%',
    };
}
//</editor-fold>
