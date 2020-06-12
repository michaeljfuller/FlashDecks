import React from 'react';
import {Thumbnail} from 'native-base';

import {AvatarProps} from "./Avatar.common";

export default function Avatar(props: AvatarProps) {
    const {user, style} = props;
    const {size=40} = style||{};
    return <Thumbnail style={{
        width: size, height: size, borderRadius: size/2
    }} source={{ uri: 'https://picsum.photos/200' }} />;
}
