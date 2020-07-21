import React from 'react';

import ButtonWrapper from "./core/ButtonWrapper";
import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {getStyledTextButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";
export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color, invertColor, style } = textButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);

    const StyledButton = getStyledTextButtonBase(theme);
    return <ButtonWrapper>
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            style={{
                width: style.width,
                height: style.height,
            }}
        >{title}</StyledButton>
    </ButtonWrapper>;
}
export default TextButton;
