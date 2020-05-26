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
    return <NativeBaseIcon name={name} style={{ color: style.color }} />;
}
const nameMap = {
    [IconType.QuestionMark]: "md-help-circle-outline",
    [IconType.Home]: "md-home",
    [IconType.Menu]: "md-menu",
};
export default Icon;
