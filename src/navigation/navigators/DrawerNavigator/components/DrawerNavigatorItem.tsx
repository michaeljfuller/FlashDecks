import React from 'react';
import {Button, ButtonProps} from '../../../../components/button/Button';
import withDefaultProps from '../../../../utils/hoc/withDefaultProps/withDefaultProps';

/**
 * An item in the Drawer list.
 */
export default withDefaultProps(Button, {
    flat: true,
    color: 'Blue'
} as ButtonProps ) as typeof Button;

