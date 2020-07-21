import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
import React from "react";

export interface TextButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    style?: TextButtonStyle;
}
export interface TextButtonStyle {
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
        color = DefaultTheme.primary.key,
        invertColor = false,
    } = props;
    return {
        onClick, title, color, invertColor, style,
        disabled: disabled || !props.onClick,
    };
}
