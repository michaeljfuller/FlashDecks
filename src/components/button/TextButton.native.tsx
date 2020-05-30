import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color } = textButtonPropsWithDefaults(props);

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        transparent
    >
        <NativeBaseText style={{ color: 'red' }}>{title}</NativeBaseText>
    </NativeBaseButton>;
}
export default TextButton;

