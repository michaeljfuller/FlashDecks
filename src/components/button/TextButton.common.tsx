import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";

export interface TextButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
}

const noop = () => {};
export function textButtonPropsWithDefaults(props: TextButtonProps): Required<TextButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        style = {},
        width = Number.NaN,
        height = Number.NaN,
        color = DefaultTheme.primary.key,
        invertColor = false,
    } = props;
    return {
        onClick, title, color, invertColor, style, width, height,
        disabled: disabled || !props.onClick,
    };
}
