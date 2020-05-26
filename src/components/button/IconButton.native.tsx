import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import {Icon} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, text, disabled, icon, style } = iconButtonPropsWithDefaults(props);
    const textElement = text ? <NativeBaseText style={{ color: style.color }}>{text}</NativeBaseText> : null;

    return <NativeBaseButton
        onPress={onClick}
        disabled={disabled}
        style={{
            width: style.width || (textElement ? undefined : 50),
            height: style.height,
        }}
        transparent
        iconLeft
    >
        <Icon type={icon} style={{ color: style.color }} />
        {textElement}
    </NativeBaseButton>
}
export default IconButton;
