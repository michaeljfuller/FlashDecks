import React from 'react';
import {Thumbnail} from 'native-base';
import {Text, View} from "react-native";

import {AvatarProps} from "./Avatar.common";

export default function Avatar(props: AvatarProps) {
    const {user, style, labelPlacement} = props;
    const {size=40, labelColor='white'} = style||{};
    const username = user ? user.displayName : 'Unknown';

    const icon = <Thumbnail style={{
        width: size, height: size, borderRadius: size/2
    }} source={{ uri: 'https://picsum.photos/200' }} />;

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

    return icon;
}
