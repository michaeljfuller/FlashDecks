import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import {Icon} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, text, disabled, icon, style, transparent } = iconButtonPropsWithDefaults(props);
    const textElement = text ? <NativeBaseText style={{ color: 'red' }}>{text}</NativeBaseText> : null;

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        style={{
            width: style.width,
            height: style.height,
            paddingHorizontal: 5,
        }}
        transparent={transparent}
        iconLeft
    >
        <Icon type={icon} style={{ color: 'red' }} />
        {textElement}
    </NativeBaseButton>
}
export default IconButton;
