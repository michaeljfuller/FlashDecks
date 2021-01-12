import React from 'react';

import {ButtonProps, buttonPropsWithDefaults, StandardButtonWrapper} from './Button.common';
import {getStyledButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";
import Icon from "../icon/Icon";

export * from './Button.common';

/**
 * A bridge to a Material-UI Button
 */
export const Button = React.memo(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {onClick, disabled, title, icon, iconPosition, flat, transparent, color, square, invertColor} = allProps;

    const theme = getUIColorTheme(color, invertColor);
    const StyledButton = getStyledButtonBase(theme, square, flat || disabled, transparent, title.length>0);

    return <StandardButtonWrapper buttonProps={allProps}>
        <StyledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            disableElevation={flat}
        >
            {icon && iconPosition !== "right" ? <Icon type={icon} flat={flat || !transparent} /> : null}
            {title}
            {icon && iconPosition === "right" ? <Icon type={icon} flat={flat || !transparent} /> : null}
        </StyledButton>
    </StandardButtonWrapper>;
});
export default Button;

