import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button, {ButtonProps} from '@material-ui/core/Button';
import withDefaultProps from '../../../../utils/hoc/withDefaultProps/withDefaultProps';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const MaterialUiDrawerItem = withStyles({
    root: {
        borderRadius: 0,
        border: 0,
        color: 'blue',
        height: 48,
        padding: '0 30px',
        justifyContent: 'flex-start',
        '&$disabled': {
            background: 'grey',
            color: 'white',
        },
        '&:hover': {
            backgroundColor: '#cceeff'
        }
    },
    disabled: {
        opacity: 0.5
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);
export default withDefaultProps(MaterialUiDrawerItem, {
    disableRipple: true,
    disableFocusRipple: true,
    fullWidth: true,
    variant: "text"
} as ButtonProps);
