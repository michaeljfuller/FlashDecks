import React from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableHighlight,
    ViewStyle,
    TextStyle
} from "react-native";

import {ButtonProps, buttonPropsWithDefaults, ButtonVariation} from './Button.common';
export * from './Button.common';

export function Button(props: ButtonProps) {
    const { onClick, disabled, title, flat, style, variation } = buttonPropsWithDefaults(props);

    return <TouchableHighlight
        onPress={onClick}
        disabled={disabled}
    >
        <View>
            <Text>{title}</Text>
        </View>
    </TouchableHighlight>;
}
export default Button;

