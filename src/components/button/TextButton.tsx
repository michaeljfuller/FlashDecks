import React from 'react';

import ButtonWrapper from "./core/ButtonWrapper";
import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {getStyledTextButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";
export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color, invertColor, style, width, height } = textButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);

    const StyledButton = getStyledTextButtonBase(theme);
    return <ButtonWrapper style={style}>
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            style={{
                width: numberOrDefault(width, undefined),
                height: numberOrDefault(height, undefined),
            }}
        >{title}</StyledButton>
    </ButtonWrapper>;
}
export default TextButton;
