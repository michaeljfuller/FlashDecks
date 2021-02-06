import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
import {IconType} from "../icon/Icon.common";

export {
    IconType
};

export interface ButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    icon?: IconType|null;
    iconPosition?: "left"|"right";
    flat?: boolean;
    transparent?: boolean;
    style?: StyleProp<ViewStyle>;
    color?: GetUIColorThemeInput;
    square?: boolean;
    invertColor?: boolean;
    width?: number;
    height?: number;
    flex?: boolean|number;
}

const noop = () => {};
export function buttonPropsWithDefaults(props: ButtonProps): Required<ButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        icon = null,
        iconPosition = "left",
        flat = false,
        transparent = false,
        style = {},
        color = DefaultTheme.primary.key,
        square = false,
        invertColor = false,
        width = Number.NaN,
        height = Number.NaN,
        flex = false,
    } = props;
    return {
        onClick, title, icon, iconPosition, flat, transparent, style, color, square, invertColor, width, height, flex,
        disabled: disabled || !props.onClick,
    };
}
