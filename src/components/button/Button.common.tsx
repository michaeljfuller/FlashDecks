import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
import ButtonWrapper from "./core/ButtonWrapper";
import {numberOrDefault} from "../../utils/math";
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
    } = props;
    return {
        onClick, title, icon, iconPosition, flat, transparent, style, color, square, invertColor, width, height,
        disabled: disabled || !props.onClick,
    };
}

//<editor-fold desc="ButtonWrapper">

type StandardButtonWrapperProps = React.PropsWithChildren<{
    buttonProps: Required<ButtonProps>;
}>;

export const StandardButtonWrapper = React.memo<StandardButtonWrapperProps>(function StandardButtonWrapper(
    props: StandardButtonWrapperProps
) {
    const {style, width, height} = props.buttonProps;
    return <ButtonWrapper style={style} width={width} height={height}>{props.children}</ButtonWrapper>
});

//</editor-fold>
