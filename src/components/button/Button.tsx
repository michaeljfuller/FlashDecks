import React from 'react';
import {StyleSheet, View} from 'react-native';

import {ButtonProps, buttonPropsWithDefaults} from './Button.common';
import {getStyledButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";
import Icon, {iconStandardSize} from "../icon/Icon";
import ButtonWrapper from "./core/ButtonWrapper";

export * from './Button.common';

/**
 * A bridge to a Material-UI Button
 */
export const Button = React.memo(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {
        onClick, disabled, title, icon, iconPosition, flat, transparent, square, color, invertColor, style, width, height, flex
    } = allProps;
    const theme = getUIColorTheme(color, invertColor);
    const iconThreshold = iconStandardSize + iconPadding*2;
    const StyledButton = getStyledButtonBase(
        theme,
        square,
        flat || disabled,
        transparent,
        title.length>0,
        icon ? iconPosition : undefined,
        width < iconThreshold || height < iconThreshold
    );

    return <ButtonWrapper style={style} width={width} height={height} flex={flex}>
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
    </ButtonWrapper>;
});
export default Button;

const iconPadding = 2;
const styles = StyleSheet.create({
    iconLeft: { paddingRight: iconPadding },
    iconRight: { paddingLeft: iconPadding },
});
