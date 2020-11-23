import React from 'react';
import {Icon as NativeBaseIcon, NativeBase} from 'native-base';

import {IconType, IconProps, IconPropTypes} from './Icon.common';
export * from './Icon.common';

const nameMap = {
    // https://oblador.github.io/react-native-vector-icons/ ("Ionicons" is the default)
    [IconType.QuestionMark]: "md-help-circle-outline",
    [IconType.Home]: "md-home",
    [IconType.Menu]: "md-menu",
    [IconType.Exit]: "md-exit",
    [IconType.Back]: "md-return-left",
    [IconType.Edit]: "md-create",
    [IconType.Delete]: "md-trash",
    [IconType.More]: "md-more",
    [IconType.Info]: "md-information-circle-outline",
    [IconType.Cancel]: "md-close",
    [IconType.Done]: "md-checkmark",
    [IconType.Resize]: "md-resize",
    [IconType.Add]: "md-add",
    [IconType.Remove]: "md-remove",
} as Record<IconType, string>;

/**
 * Show an icon by its `type`.
 */
export const Icon: React.ComponentType<IconProps> = React.memo(function Icon(props: IconProps) {
    const { style = {} } = props;
    const name = nameMap[props.type];
    if (name) {
        return React.createElement(NativeBaseIcon, {
            name,
            style: {color: style.color, marginLeft: 0, marginRight: 0, padding: 0}
        } as NativeBase.Icon);
    }
    return null;
});
Icon.propTypes = IconPropTypes;
export default Icon;
