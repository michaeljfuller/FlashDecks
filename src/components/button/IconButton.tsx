import React from 'react';
import MaterialButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';

import {Icon} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
export * from './IconButton.common';

const StyledButton = withStyles({
    root: {
        // justifyContent: 'flex-start', // left: 'flex-start', right: 'flex-end', center: 'center'
        padding: 0,
        '&:disabled': {
            opacity: 0.5
        }
    },
    label: {
        textTransform: 'none'
    }
})(MaterialButton) as typeof MaterialButton;

export function IconButton(props: IconButtonProps) {
    const { onClick, disabled, icon, style } = iconButtonPropsWithDefaults(props);
    return <StyledButton
        onClick={onClick}
        disabled={disabled}
        style={{
            width: style.width,
            height: style.height,
            color: style.color,
        }}
    >
        <Icon type={icon} />
    </StyledButton>;
}
export default IconButton;
