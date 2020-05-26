import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, style } = textButtonPropsWithDefaults(props);

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        transparent
    >
        <NativeBaseText style={{ color: style.color }}>{title}</NativeBaseText>
    </NativeBaseButton>;
}
export default TextButton;

