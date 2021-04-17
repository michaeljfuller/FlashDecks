import React from 'react';
import {View} from 'react-native';

import {IconType, IconProps, IconPropTypes, iconStandardSize} from './Icon.common';
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
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import HeightIcon from '@material-ui/icons/Height';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const componentMap = {
    [IconType.QuestionMark]: HelpIcon,
    [IconType.Home]: HomeIcon,
    [IconType.Menu]: MenuIcon,
    [IconType.Exit]: ExitToAppIcon,
    [IconType.Back]: NavigateBeforeIcon,
    [IconType.Edit]: EditIcon,
    [IconType.Delete]: DeleteIcon,
    [IconType.More]: MoreVertIcon,
    [IconType.Info]: InfoOutlined,
    [IconType.Cancel]: CloseIcon,
    [IconType.Done]: DoneIcon,
    [IconType.Resize]: HeightIcon,
    [IconType.Add]: AddIcon,
    [IconType.Remove]: RemoveIcon,
} as Record<IconType, React.ElementType>;

/**
 * Show an icon by its `type`.
 */
export const Icon: React.ComponentType<IconProps> = React.memo(function Icon(props: IconProps) {
    const {
        size = iconStandardSize,
        color,
        flat = true,
        style,
    } = props;
    const component = componentMap[props.type];
    if (component) {
        const icon = React.createElement(component, {
            style: {
                width: size,
                height: size,
                color: color,
                filter: !flat ? `drop-shadow(1px 1px 2px rgba(0,0,0,0.3))` : undefined,
            }
        } as SvgIconProps);
        return <View style={style}>{icon}</View>;
    }
    return null;
});
Icon.propTypes = IconPropTypes;
export default Icon;
