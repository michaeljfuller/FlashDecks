import React from 'react';
import {TextStyle} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {ButtonProps, buttonPropsWithDefaults, StandardButtonWrapper} from './Button.common';
import {Color, getUIColorTheme} from "../../styles/UIColorTheme";

export * from './Button.common';

export const Button = React.memo<ButtonProps>(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {onClick, disabled, title, square} = allProps;

    return <StandardButtonWrapper buttonProps={allProps}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={getBackgroundStyle(allProps)}
            rounded={!square}
        >
            <NativeBaseText style={getTextStyle(allProps)} uppercase={false}>{title}</NativeBaseText>
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
