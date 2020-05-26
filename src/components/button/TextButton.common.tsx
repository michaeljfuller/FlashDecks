export interface TextButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    title?: string;
    style?: TextButtonStyle;
}
export interface TextButtonStyle {
    color?: string;
}

const noop = () => {};
export function textButtonPropsWithDefaults(props: TextButtonProps) {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        style = {}
    } = props;
    return {
        onClick, title, style,
        disabled: disabled || !props.onClick,
    };
}
