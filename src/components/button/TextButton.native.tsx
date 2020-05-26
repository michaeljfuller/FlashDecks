import React from 'react';
import {Text} from 'react-native';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    return <Text>TextButton {props.title}</Text>
}
export default TextButton;
