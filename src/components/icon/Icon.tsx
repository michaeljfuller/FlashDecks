import React from 'react';

// https://material-ui.com/components/material-icons/
import {SvgIconProps} from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

import {IconType, IconProps} from './Icon.common';
export * from './Icon.common';

/**
 * Show an icon by its `type`.
 */
export function Icon(props: IconProps) {
    const {
        style = {}
    } = props;
    const iconProps: SvgIconProps = {
        style: {
            width: style.width,
            height: style.height,
        }
    }
    switch (props.type) {
        case IconType.QuestionMark: return <HelpIcon {...iconProps} />;
        case IconType.Home: return <HomeIcon {...iconProps} />;
        case IconType.Menu: return <MenuIcon {...iconProps} />;
    }
    return null;
}
export default Icon;
