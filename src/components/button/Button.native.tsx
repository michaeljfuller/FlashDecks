import React from 'react';
import {TextStyle} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {Color} from '../../styles/Color';
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
const backgroundStyles: Record<string, RnViewStyleProp> = {
    red: {   backgroundColor: Color.Red },
    green: { backgroundColor: Color.Green },
    blue: {  backgroundColor: Color.Blue },
};

const textStyles: Record<string, TextStyle> = {
    red: {   color: Color.White },
    green: { color: Color.White },
    blue: {  color: Color.White },
};
function getBackgroundStyle(props: ButtonProps) {
    const {color, style, flat} = props;
    const result: Array<RnViewStyleProp> = [{
        width: style?.width,
        height: style?.height,
        // TODO handle shadow/flat
        shadowOffset: {
            height: 3, width: 3
        },
        // shadowOpacity: 100,
        shadowColor: Color.Black
    }];
    switch (color) {
        default:                       result.push(backgroundStyles.blue); break;
        // case ButtonVariation.Standard: result.push(backgroundStyles.blue); break;
        // case ButtonVariation.Red:      result.push(backgroundStyles.red); break;
        // case ButtonVariation.Green:    result.push(backgroundStyles.green); break;
        // case ButtonVariation.Blue:     result.push(backgroundStyles.blue); break;
    }
    return result;
}
function getTextStyle(props: ButtonProps) {
    const {color} = props;
    const result: RnViewStyleProp[] = [];
    switch (color) {
        default:                       result.push(textStyles.blue); break;
        // case ButtonVariation.Standard: result.push(textStyles.blue); break;
        // case ButtonVariation.Red:      result.push(textStyles.red); break;
        // case ButtonVariation.Green:    result.push(textStyles.green); break;
        // case ButtonVariation.Blue:     result.push(textStyles.blue); break;
    }
    return result;
}
//</editor-fold>
