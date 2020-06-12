import React from 'react';

import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {getStyledButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";
export * from './Button.common';

/**
 * A bridge to a Material-UI Button
 */
export function Button(props: ButtonProps) {
    const { onClick, disabled, title, flat, style, color, invertColor } = buttonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    const StyledButton = getStyledButtonBase(theme);
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

