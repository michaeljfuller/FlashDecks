import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import MaterialAvatar from '@material-ui/core/Avatar';
import MaterialTooltip from '@material-ui/core/Tooltip';
import {withStyles} from "@material-ui/core/styles";

import {AvatarProps} from "./Avatar.common";
export * from "./Avatar.common";

const Tooltip = withStyles({
    tooltip: {
        marginTop: 7
    }
})(MaterialTooltip) as typeof MaterialTooltip;

export const Avatar = React.memo(function Avatar(props: AvatarProps) {
    const {user, style, size=40, labelStyle, labelPlacement} = props;
    const label = props.label || (user && user.displayName) || 'Unknown';

    const icon = <MaterialAvatar src="https://picsum.photos/200" style={{ width: size, height: size }}>
        {user ? user.displayName.substr(0, 2) : '?'}
    </MaterialAvatar>;

    const labelStyles = [{ lineHeight: size }, labelStyle];

    switch (labelPlacement) {
        case "left":
            return <View style={[styles.row, style]}>
                <Text style={[styles.labelLeft, ...labelStyles]}>{label}</Text>
                {icon}
            </View>;
        case "right":
            return <View style={[styles.row, style]}>
                {icon}
                <Text style={[styles.labelRight, ...labelStyles]}>{label}</Text>
            </View>;
    }

    return <Tooltip arrow title={label}>
        <View style={style}>{icon}</View>
    </Tooltip>;
});
export default Avatar;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    labelLeft: {
        color: 'white',
        marginRight: 5,
    },
    labelRight: {
        color: 'white',
        marginLeft: 5,
    }
});
