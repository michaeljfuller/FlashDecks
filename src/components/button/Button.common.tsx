import {ColorKey} from "../../styles/Color";
import {DefaultTheme} from "../../styles/UIColorTheme";

export interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    title?: string;
    flat?: boolean;
    style?: ButtonStyle;
    color?: ColorKey;
}
export interface ButtonStyle {
    width?: number;
    height?: number;
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
    } = props;
    return {
        onClick, title, flat, style, color,
        disabled: disabled || !props.onClick,
    };
}
