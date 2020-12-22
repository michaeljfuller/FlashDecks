import React from 'react';

import {ButtonProps, buttonPropsWithDefaults, StandardButtonWrapper} from './Button.common';
import {getStyledButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";

export * from './Button.common';

/**
 * A bridge to a Material-UI Button
 */
export const Button = React.memo(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {onClick, disabled, title, flat, color, square, invertColor} = allProps;

    const theme = getUIColorTheme(color, invertColor);
    const StyledButton = getStyledButtonBase(theme, square);

    return <StandardButtonWrapper buttonProps={allProps}>
        <StyledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            disableElevation={flat}
        >{title}</StyledButton>
    </StandardButtonWrapper>;
});
export default Button;

