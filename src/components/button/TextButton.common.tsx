import {ColorKey} from "../../styles/Color";
import {DefaultTheme} from "../../styles/UIColorTheme";
import React from "react";

export interface TextButtonProps {
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    color?: ColorKey;
    invertColor?: boolean;
}

const noop = () => {};
export function textButtonPropsWithDefaults(props: TextButtonProps): Required<TextButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        color = DefaultTheme.primary.key,
        invertColor = false,
    } = props;
    return {
        onClick, title, color, invertColor,
        disabled: disabled || !props.onClick,
    };
}
