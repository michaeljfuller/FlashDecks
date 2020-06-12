import React from 'react';

import {IconType, IconProps} from './Icon.common';
export * from './Icon.common';

// https://material-ui.com/components/material-icons/
import {SvgIconProps} from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const componentMap = {
    [IconType.QuestionMark]: HelpIcon,
    [IconType.Home]: HomeIcon,
    [IconType.Menu]: MenuIcon,
    [IconType.Exit]: ExitToAppIcon,
    [IconType.Back]: NavigateBeforeIcon,
    [IconType.Edit]: EditIcon,
    [IconType.Delete]: DeleteIcon,
    [IconType.More]: MoreVertIcon,
} as Record<IconType, React.ElementType>;

/**
 * Show an icon by its `type`.
 */
export function Icon(props: IconProps) {
    const { style = {} } = props;
    const component = componentMap[props.type];
    if (component) {
        return React.createElement(component, {
            style: { width: style.width, height: style.height, color: style.color }
        } as SvgIconProps);
    }
    return null;
}
export default Icon;
