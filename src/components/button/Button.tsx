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
    const {onClick, disabled, title, icon, iconPosition, flat, color, square, invertColor} = allProps;

    const theme = getUIColorTheme(color, invertColor);
    const StyledButton = getStyledButtonBase(theme, square);
    const iconComponent = icon ? <Icon type={icon} /> : null;

    return <StandardButtonWrapper buttonProps={allProps}>
        <StyledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            disableElevation={flat}
        >
            {iconPosition === "left"  ? iconComponent : null}
            {title}
            {iconPosition === "right" ? iconComponent : null}
        </StyledButton>
    </StandardButtonWrapper>;
});
export default Button;

