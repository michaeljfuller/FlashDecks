import React from 'react';
import {Text} from 'react-native';
import MaterialButton from '@material-ui/core/Button';
import MaterialIconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';

import {Icon} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
import {Color, DisabledColor, HoverColor, LightColor} from "../../styles/Color";
export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, disabled, icon, style, text, transparent } = iconButtonPropsWithDefaults(props);

    if (!transparent) {
        return <StyledButton
            onClick={onClick}
            disabled={disabled}
            style={{ width: style.width, height: style.height, textAlign: "center" }}
            variant="contained"
        >
            <Icon type={icon} style={{ color: style.color }} />
            {text && <Text style={{ color: style.color }}>{text}</Text>}
        </StyledButton>
    } else {
        return <StyledIconButton
            onClick={onClick}
            disabled={disabled}
            style={{width: style.width, height: style.height}}
        >
            <Icon type={icon} style={{color: style.color}}/>
            {text && <Text style={{color: style.color}}>{text}</Text>}
        </StyledIconButton>;
    }
}
export default IconButton;

const StyledButton = withStyles({
    root: {
        justifyContent: 'flex-start',
        color: LightColor.White,
        backgroundColor: Color.Blue,
        minWidth: 0,
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
})(MaterialButton) as typeof MaterialButton;

const StyledIconButton = withStyles({
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
})(MaterialIconButton) as typeof MaterialIconButton;
