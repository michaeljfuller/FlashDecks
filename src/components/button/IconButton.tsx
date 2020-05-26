import React from 'react';
import {Text} from 'react-native';
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
    const { onClick, disabled, icon, style, text } = iconButtonPropsWithDefaults(props);
    return <StyledButton
        onClick={onClick}
        disabled={disabled}
        style={{
            width: style.width,
            height: style.height
        }}
    >
        <Icon type={icon} style={{ color: style.color }} />
        {text && <Text style={{ color: style.color }}>{text}</Text>}
    </StyledButton>;
}
export default IconButton;
