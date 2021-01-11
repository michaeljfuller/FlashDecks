import React from "react";
import {ViewStyle} from "react-native";
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
    icon?: IconType;
    iconPosition?: "left"|"right";
    flat?: boolean;
    style?: ViewStyle|ViewStyle[];
    color?: GetUIColorThemeInput;
    square?: boolean;
    invertColor?: boolean;
    width?: number;
    height?: number;
    size?: number;
}

const noop = () => {};
export function buttonPropsWithDefaults(props: ButtonProps): Required<ButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        icon = undefined,
        iconPosition = "left",
        flat = false,
        style = {},
        color = DefaultTheme.primary.key,
        square = false,
        invertColor = false,
        width = Number.NaN,
        height = Number.NaN,
        size = Number.NaN,
    } = props;
    return {
        onClick, title, icon, iconPosition, flat, style, color, square, invertColor, width, height, size,
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
    const {style, width, height, size} = props.buttonProps;
    return <ButtonWrapper
        style={[
            style, {
                width: numberOrDefault(width, undefined),
                height: numberOrDefault(height, undefined),
            }
        ]}
        size={numberOrDefault(size, undefined)}
    >{props.children}</ButtonWrapper>
});

//</editor-fold>
