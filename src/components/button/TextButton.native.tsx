import React from 'react';
import {Button as NativeBaseButton, Text as NativeBaseText} from 'native-base';

import ButtonWrapper from "./core/ButtonWrapper";
import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";

export * from './TextButton.common';

export const TextButton = React.memo(function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color, invertColor, style, width, height } = textButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);

    return <ButtonWrapper style={style}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            transparent
            style={{
                width: numberOrDefault(width, undefined),
                height: numberOrDefault(height, undefined),
            }}
        >
            <NativeBaseText style={{ color: theme.primary.base }}>{title}</NativeBaseText>
        </NativeBaseButton>
    </ButtonWrapper>;
});
export default TextButton;

