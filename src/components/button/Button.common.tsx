export interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    title?: string;
    flat?: boolean;
    style?: ButtonStyle;
    variation?: ButtonVariation;
}
export interface ButtonStyle {
    width?: number;
    height?: number;
}
export enum ButtonVariation {
    Standard,
    Red,
    Green,
    Blue
}

const noop = () => {};
export function buttonPropsWithDefaults(props: ButtonProps) {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        flat = false,
        style = {},
        variation = ButtonVariation.Standard
    } = props;
    return {
        onClick, title, flat, style, variation,
        disabled: disabled || !props.onClick,
    };
}
