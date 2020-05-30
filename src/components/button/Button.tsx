import React from 'react';

import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {getStyledButtonBase} from "./material-ui/StyledButtonBase";
export * from './Button.common';

/**
 * A bridge to a Material-UI Button
 */
export function Button(props: ButtonProps) {
    const { onClick, disabled, title, flat, style, color } = buttonPropsWithDefaults(props);
    const StyledButton = getStyledButtonBase(color);
    return <StyledButton
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        disableElevation={flat}
        style={{
            width: style.width,
            height: style.height,
        }}
    >{title}</StyledButton>;
}
export default Button;

