import React from 'react';
import {Text} from 'react-native';

import {IconType, IconProps} from './Icon.common';
export * from './Icon.common';

/**
 * Show an icon by its `type`.
 */
export function Icon(props: IconProps) {
    return <Text>Icon {props.type}</Text>
}
export default Icon;
