import React from 'react';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {getStyledTextButtonBase} from "./material-ui/StyledButtonBase";
export * from './TextButton.common';

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color } = textButtonPropsWithDefaults(props);
    const StyledButton = getStyledTextButtonBase(color);
    return <StyledButton
        onClick={onClick}
        disabled={disabled}
    >{title}</StyledButton>;
}
export default TextButton;
