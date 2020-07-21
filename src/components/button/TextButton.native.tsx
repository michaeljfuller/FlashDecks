import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";

export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color, invertColor, style } = textButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);

    return <ButtonWrapper>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            transparent
            style={{
                width: style.width,
                height: style.height,
            }}
        >
            <NativeBaseText style={{ color: theme.primary.base }}>{title}</NativeBaseText>
        </NativeBaseButton>
    </ButtonWrapper>;
}
export default TextButton;

