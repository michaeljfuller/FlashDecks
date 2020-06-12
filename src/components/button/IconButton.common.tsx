import {IconType} from '../icon/Icon';
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
import React from "react";

export {IconType} from '../icon/Icon';

export interface IconButtonProps {
    icon?: IconType;
    text?: string;
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    transparent?: boolean;
    style?: IconButtonStyle;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
}
export interface IconButtonStyle {
    width?: number;
    height?: number;
}

const noop = () => {};
export function iconButtonPropsWithDefaults(props: IconButtonProps): Required<IconButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        transparent = false,
        icon = IconType.QuestionMark,
        text = '',
        color = DefaultTheme.primary.key,
        invertColor = false,
        style = {}
    } = props;
    return {
        onClick, icon, style, text, transparent, color, invertColor,
        disabled: disabled || !props.onClick,
    };
}
