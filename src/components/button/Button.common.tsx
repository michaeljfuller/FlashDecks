import React from "React";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";

export interface ButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    flat?: boolean;
    style?: ButtonStyle;
    color?: GetUIColorThemeInput;
    square?: boolean;
    invertColor?: boolean;
}
export interface ButtonStyle {
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
    } = props;
    return {
        onClick, title, flat, style, color, square, invertColor,
        disabled: disabled || !props.onClick,
    };
}
