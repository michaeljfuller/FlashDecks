import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";

export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color, invertColor } = textButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        transparent
    >
        <NativeBaseText style={{ color: theme.primary.base }}>{title}</NativeBaseText>
    </NativeBaseButton>;
}
export default TextButton;

