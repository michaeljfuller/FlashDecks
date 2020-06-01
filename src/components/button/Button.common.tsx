import React from "React";
import {ColorKey} from "../../styles/Color";
import {DefaultTheme} from "../../styles/UIColorTheme";

export interface ButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    flat?: boolean;
    style?: ButtonStyle;
    color?: ColorKey;
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
        invertColor = false,
    } = props;
    return {
        onClick, title, flat, style, color, invertColor,
        disabled: disabled || !props.onClick,
    };
}
