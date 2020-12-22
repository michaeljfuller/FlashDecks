import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import {TextButtonProps, textButtonPropsWithDefaults, TextButtonWrapper} from './TextButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";

export * from './TextButton.common';

export const TextButton = React.memo(function TextButton(props: TextButtonProps) {
    const allProps = textButtonPropsWithDefaults(props);
    const {onClick, disabled, title, color, invertColor} = allProps;

    const theme = getUIColorTheme(color, invertColor);

    return <TextButtonWrapper buttonProps={allProps}>
        <NativeBaseButton onPress={onClick} disabled={disabled} transparent>
            <NativeBaseText style={{ color: disabled ? theme.primary.disabled : theme.primary.base }}>{title}</NativeBaseText>
        </NativeBaseButton>
    </TextButtonWrapper>;
});
export default TextButton;

