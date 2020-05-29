import React from 'react';
import {Icon as NativeBaseIcon, NativeBase} from 'native-base';

import {IconType, IconProps} from './Icon.common';
export * from './Icon.common';

const nameMap = {
    // https://oblador.github.io/react-native-vector-icons/ ("Ionicons" is the default)
    [IconType.QuestionMark]: "md-help-circle-outline",
    [IconType.Home]: "md-home",
    [IconType.Menu]: "md-menu",
    [IconType.Exit]: "md-exit",
    [IconType.Back]: "md-return-left",
    [IconType.Edit]: "md-create",
    [IconType.View]: "md-eye",
} as Record<IconType, string>;

/**
 * Show an icon by its `type`.
 */
export function Icon(props: IconProps) {
    const { style = {} } = props;
    const name = nameMap[props.type];
    if (name) {
        return React.createElement(NativeBaseIcon, {
            name,
            style: {color: style.color, marginLeft: 0, marginRight: 0, padding: 0}
        } as NativeBase.Icon);
    }
    return null;
}
export default Icon;
