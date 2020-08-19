import React from 'react';

import ButtonWrapper from "./core/ButtonWrapper";
import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {getStyledButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";
export * from './Button.common';

/**
 * A bridge to a Material-UI Button
 */
export const Button = React.memo(function Button(props: ButtonProps) {
    const { onClick, disabled, title, flat, style, color, square, invertColor, width, height } = buttonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    const StyledButton = getStyledButtonBase(theme, square);
    return <ButtonWrapper style={style}>
        <StyledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            disableElevation={flat}
            style={{
                width: numberOrDefault(width, undefined),
                height: numberOrDefault(height, undefined),
            }}
        >{title}</StyledButton>
    </ButtonWrapper>;
});
export default Button;

