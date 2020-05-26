import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {TextButtonProps, textButtonPropsWithDefaults} from './TextButton.common';
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
    const { onClick, disabled, title, style } = textButtonPropsWithDefaults(props);
    return <StyledButton
        variant="text"
        onClick={onClick}
        disabled={disabled}
        style={{
            color: style.color || '#000'
        }}
    >{title}</StyledButton>;
}
export default TextButton;
