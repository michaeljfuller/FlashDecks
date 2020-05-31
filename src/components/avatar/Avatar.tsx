import React from 'react';

import MaterialAvatar from '@material-ui/core/Avatar';
import MaterialTooltip from '@material-ui/core/Tooltip';
import {withStyles} from "@material-ui/core/styles";

import {AvatarProps} from "./Avatar.common";

const Tooltip = withStyles({
    tooltip: {
        marginTop: 7
    }
})(MaterialTooltip) as typeof MaterialTooltip;

export default function Avatar(props: AvatarProps) {
    const {user} = props;
    return <Tooltip arrow title={user ? user.displayName : 'Unknown'}>
        <MaterialAvatar>{user ? user.displayName.substr(0, 2) : '?'}</MaterialAvatar>
    </Tooltip>;
}
