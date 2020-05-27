import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {ButtonProps, buttonPropsWithDefaults, ButtonVariation} from './Button.common';
import {Color, LightColor, HoverColor, DisabledColor} from "../../styles/Color";
export * from './Button.common';

//<editor-fold desc="Variations">
const RedButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        color: LightColor.White,
        backgroundColor: Color.Red,
        '&:hover': {
            color: Color.White,
            backgroundColor: HoverColor.Red,
        },
        '&:disabled': {
            color: DisabledColor.White,
            backgroundColor: DisabledColor.Red,
            // opacity: 0.8
        }
    },
    label: {
        textTransform: 'none'
    }
})(MaterialButton);

const GreenButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        color: LightColor.White,
        backgroundColor: Color.Green,
        '&:hover': {
            color: Color.White,
            backgroundColor: HoverColor.Green,
        },
        '&:disabled': {
            color: DisabledColor.White,
            backgroundColor: DisabledColor.Green,
            // opacity: 0.8
        }
    },
    label: {
        textTransform: 'none'
    }
})(MaterialButton);

const BlueButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        color: LightColor.White,
        backgroundColor: Color.Blue,
        '&:hover': {
            color: Color.White,
            backgroundColor: HoverColor.Blue,
        },
        '&:disabled': {
            color: DisabledColor.White,
            backgroundColor: DisabledColor.Blue,
            // opacity: 0.8
        }
    },
    label: {
        textTransform: 'none'
    }
})(MaterialButton);

function getVariation(variation: ButtonVariation) {
    switch (variation) {
        default: return BlueButton;
        case ButtonVariation.Standard: return BlueButton;
        case ButtonVariation.Red: return RedButton;
        case ButtonVariation.Green: return GreenButton;
        case ButtonVariation.Blue: return BlueButton;
    }
}
//</editor-fold>

/**
 * A bridge to a Material-UI Button
 */
export function Button(props: ButtonProps) {
    const { onClick, disabled, title, flat, style, variation } = buttonPropsWithDefaults(props);
    const StyledButton = getVariation(variation);
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

