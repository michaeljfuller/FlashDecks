import React from 'react';
import {Icon as NativeBaseIcon} from 'native-base';

import {IconType, IconProps} from './Icon.common';
export * from './Icon.common';

/**
 * Show an icon by its `type`.
 */
export function Icon(props: IconProps) {
    const {type, style = {}} = props;
    const name = nameMap[type];
    if (!name) return null;
    return <NativeBaseIcon name={name} style={{
        color: style.color, marginLeft: 0, marginRight: 0, padding: 0,
    }} />;
}
const nameMap = {
    // https://oblador.github.io/react-native-vector-icons/ ("Ionicons" is the default)
    [IconType.QuestionMark]: "md-help-circle-outline",
    [IconType.Home]: "md-home",
    [IconType.Menu]: "md-menu",
    [IconType.Exit]: "md-exit",
    [IconType.Back]: "md-return-left",
};
export default Icon;
