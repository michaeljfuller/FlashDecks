import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {ButtonProps, buttonPropsWithDefaults, ButtonVariation} from './Button.common';
export * from './Button.common';

//<editor-fold desc="Variations">
const RedButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        color: '#FFF',
        backgroundColor: '#F44',
        '&:hover': {
            backgroundColor: '#D33',
        },
        '&:disabled': {
            color: '#FFF',
            opacity: 0.5
        }
    },
    label: {
        textTransform: 'none'
    }
})(MaterialButton);

const GreenButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        color: '#FFF',
        backgroundColor: '#4b3',
        '&:hover': {
            backgroundColor: '#392',
        },
        '&:disabled': {
            color: '#FFF',
            opacity: 0.5
        }
    },
    label: {
        textTransform: 'none'
    }
})(MaterialButton);

const BlueButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        color: '#FFF',
        backgroundColor: '#46F',
        '&:hover': {
            backgroundColor: '#35D',
        },
        '&:disabled': {
            color: '#FFF',
            opacity: 0.5
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

