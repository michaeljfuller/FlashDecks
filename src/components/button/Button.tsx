import React from 'react';
import {StyleSheet, View} from 'react-native';

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
    const StyledButton = getStyledButtonBase(
        theme,
        square,
        flat || disabled,
        transparent,
        title.length>0,
        icon ? iconPosition : undefined
    );

    return <StandardButtonWrapper buttonProps={allProps}>
        <StyledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            disableElevation={flat}
        >
            {/* Icon left of text */
                icon && title && iconPosition !== "right" ?
                <View style={styles.iconLeft}><Icon type={icon} flat={flat || !transparent} /></View> : null
            }

            {title}

            {/* Icon right of text */
                icon && title && iconPosition === "right" ?
                <View style={styles.iconRight}><Icon type={icon} flat={flat || !transparent} /></View> : null
            }

            {/* Icon centered without text */
                icon && !title ?
                <Icon type={icon} flat={flat || !transparent} /> : null
            }

        </StyledButton>
    </StandardButtonWrapper>;
});
export default Button;

const styles = StyleSheet.create({
    iconLeft: { paddingRight: 2 },
    iconRight: { paddingLeft: 2 },
});
