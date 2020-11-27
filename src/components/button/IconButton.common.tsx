import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {IconType} from '../icon/Icon';
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
export {IconType} from '../icon/Icon';

export interface IconButtonProps {
    icon?: IconType;
    text?: string;
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    transparent?: boolean;
    flat?: boolean;
    style?: StyleProp<ViewStyle>;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    width?: number;
    height?: number;
    margin?: number;
}

const noop = () => {};
export function iconButtonPropsWithDefaults(props: IconButtonProps): Required<IconButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        transparent = false,
        flat = false,
        icon = IconType.QuestionMark,
        text = '',
        color = DefaultTheme.primary.key,
        invertColor = false,
        style = {},
        width = Number.NaN,
        height = Number.NaN,
        margin = Number.NaN,
    } = props;
    return {
        onClick, icon, style, text, transparent, flat, color, invertColor, width, height, margin,
        disabled: disabled || !props.onClick,
    };
}
