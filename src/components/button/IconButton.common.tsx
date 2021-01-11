import React from "react";
import {ViewStyle} from "react-native";
import {IconType} from '../icon/Icon';
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
import ButtonWrapper from "./core/ButtonWrapper";
import {numberOrDefault} from "../../utils/math";

export {IconType} from '../icon/Icon';

export interface IconButtonProps {
    icon?: IconType;
    text?: string;
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    transparent?: boolean;
    flat?: boolean;
    style?: ViewStyle|ViewStyle[];
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    width?: number;
    height?: number;
    margin?: number;
    size?: number;
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
        size = Number.NaN,
    } = props;
    return {
        onClick, icon, style, text, transparent, flat, color, invertColor, width, height, margin, size,
        disabled: disabled || !props.onClick,
    };
}

//<editor-fold desc="ButtonWrapper">

type StandardButtonWrapperProps = React.PropsWithChildren<{
    buttonProps: IconButtonProps;
}>;

export const IconButtonWrapper = React.memo<StandardButtonWrapperProps>(function IconButtonWrapper(props: StandardButtonWrapperProps) {
    const {style, width, height, size} = props.buttonProps;
    return <ButtonWrapper
        style={[style, { width, height }]}
        size={numberOrDefault(size, undefined)}
    >{props.children}</ButtonWrapper>;
});

//</editor-fold>
