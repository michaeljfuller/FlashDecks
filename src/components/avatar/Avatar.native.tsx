import React from 'react';
import {Thumbnail} from 'native-base';
import {StyleSheet, Text, View} from "react-native";

import {AvatarProps, AvatarPropTypes} from "./Avatar.common";
export * from "./Avatar.common";

export const TestIDs = {
    Root: "Avatar-Root",
    Icon: "Avatar-Icon",
}

export const Avatar: React.ComponentType<AvatarProps> = React.memo(function Avatar(props: AvatarProps) {
    const {user, style, size=40, labelStyle, labelPlacement} = props;
    const label = props.label || (user && user.displayName) || 'Unknown';

    const icon = <Thumbnail testID={TestIDs.Icon} style={{
        width: size, height: size, borderRadius: size/2
    }} source={{ uri: 'https://picsum.photos/200' }} />;

    const labelStyles = [{ lineHeight: size }, labelStyle];

    switch (labelPlacement) {
        case "left":
            return <View testID={TestIDs.Root} style={[styles.root, style]}>
                <Text style={[styles.labelLeft, ...labelStyles]}>{label}</Text>
                {icon}
            </View>;
        case "right":
            return <View testID={TestIDs.Root} style={[styles.root, style]}>
                {icon}
                <Text style={[styles.labelRight, ...labelStyles]}>{label}</Text>
            </View>;
    }

    return <View testID={TestIDs.Root} style={[styles.root, style]}>
        {icon}
    </View>;
});
Avatar.propTypes = AvatarPropTypes;
export default Avatar;

const styles = StyleSheet.create({
    root: {
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

