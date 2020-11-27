import React from "React";
import {StyleProp, ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";

export interface ButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    flat?: boolean;
    style?: StyleProp<ViewStyle>;
    color?: GetUIColorThemeInput;
    square?: boolean;
    invertColor?: boolean;
    width?: number;
    height?: number;
}

const noop = () => {};
export function buttonPropsWithDefaults(props: ButtonProps): Required<ButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        flat = false,
        style = {},
        color = DefaultTheme.primary.key,
        square = false,
        invertColor = false,
        width = Number.NaN,
        height = Number.NaN,
    } = props;
    return {
        onClick, title, flat, style, color, square, invertColor, width, height,
        disabled: disabled || !props.onClick,
    };
}
