import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
import {Color} from "../../styles/Color";
import {getStyledTextButtonBase} from "./material-ui/StyledButtonBase";
export * from './TextButton.common';

const StyledButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        borderRadius: 0,
        '&:disabled': {
            opacity: 0.5
        }
    },
    label: {
        textTransform: 'none'
    }
})(MaterialButton) as typeof MaterialButton;

export function TextButton(props: TextButtonProps) {
    const { onClick, disabled, title, color } = textButtonPropsWithDefaults(props);
    const StyledButton = getStyledTextButtonBase(color);
    return <StyledButton
        onClick={onClick}
        disabled={disabled}
    >{title}</StyledButton>;
}
export default TextButton;
