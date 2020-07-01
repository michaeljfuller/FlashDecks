import React from 'react';
import {Text, View} from 'react-native';

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
    const {user, style, labelPlacement} = props;
    const {size=40, labelColor='white'} = style||{};
    const username = user ? user.displayName : 'Unknown';

    const icon = <MaterialAvatar src="https://picsum.photos/200" style={{ width: size, height: size }}>
        {user ? user.displayName.substr(0, 2) : '?'}
    </MaterialAvatar>;

    switch (labelPlacement) {
        case "left":
            return <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: labelColor, lineHeight: size, marginRight: 5 }}>{username}</Text>
                {icon}
            </View>;
        case "right":
            return <View style={{ flexDirection: 'row' }}>
                {icon}
                <Text style={{ color: labelColor, lineHeight: size, marginLeft: 5 }}>{username}</Text>
            </View>;
    }

    return <Tooltip arrow title={username}>{icon}</Tooltip>;
}
