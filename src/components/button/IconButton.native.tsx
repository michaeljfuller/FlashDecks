import React from 'react';
import {Text} from 'react-native';

// import {Icon} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    return <Text>Icon {props.icon}</Text>
}
export default IconButton;
