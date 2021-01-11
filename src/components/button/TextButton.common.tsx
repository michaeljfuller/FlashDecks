import React from "react";
import {ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
import ButtonWrapper from "./core/ButtonWrapper";
import {numberOrDefault} from "../../utils/math";

export interface TextButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    style?: ViewStyle|ViewStyle[];
    width?: number;
    height?: number;
    size?: number;
}

const noop = () => {};
export function textButtonPropsWithDefaults(props: TextButtonProps): Required<TextButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        style = {},
        width = Number.NaN,
        height = Number.NaN,
        size = Number.NaN,
        color = DefaultTheme.primary.key,
        invertColor = false,
    } = props;
    return {
        onClick, title, color, invertColor, style, width, height, size,
        disabled: disabled || !props.onClick,
    };
}

//<editor-fold desc="ButtonWrapper">

type TextButtonWrapperProps = React.PropsWithChildren<{
    buttonProps: TextButtonProps;
}>;

export const TextButtonWrapper = React.memo<TextButtonWrapperProps>(function TextButtonWrapper(props: TextButtonWrapperProps) {
    const {style, width, height, size} = props.buttonProps;
    return <ButtonWrapper
        style={[
            style, {
                width: numberOrDefault(width, undefined),
                height: numberOrDefault(height, undefined),
            }
        ]}
        size={size}
    >{props.children}</ButtonWrapper>;
});

//</editor-fold>
