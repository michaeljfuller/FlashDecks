import React from 'react';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {getStyledTextButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";
export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color, invertColor } = textButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);

    const StyledButton = getStyledTextButtonBase(theme);
    return <StyledButton
        onClick={onClick}
        disabled={disabled}
    >{title}</StyledButton>;
}
export default TextButton;
