import React from "react";
import {ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";
import ButtonWrapper from "./core/ButtonWrapper";
import {numberOrDefault} from "../../utils/math";

export interface ButtonProps {
    onClick?: (event?: React.MouseEvent) => void;
    disabled?: boolean;
    title?: string;
    flat?: boolean;
    style?: ViewStyle|ViewStyle[];
    color?: GetUIColorThemeInput;
    square?: boolean;
    invertColor?: boolean;
    width?: number;
    height?: number;
    grow?: boolean|number;
    shrink?: boolean|number;
    size?: number;
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
        square = false,
        invertColor = false,
        width = Number.NaN,
        height = Number.NaN,
        grow = false,
        shrink = false,
        size = Number.NaN,
    } = props;
    return {
        onClick, title, flat, style, color, square, invertColor, width, height, grow, shrink, size,
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
    const {style, width, height, grow, shrink, size} = props.buttonProps;
    return <ButtonWrapper
        style={[
            style, {
                width: numberOrDefault(width, undefined),
                height: numberOrDefault(height, undefined),
            }
        ]}
        grow={grow}
        shrink={shrink}
        size={numberOrDefault(size, undefined)}
    >{props.children}</ButtonWrapper>
});

//</editor-fold>
