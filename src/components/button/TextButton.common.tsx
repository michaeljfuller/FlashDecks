import {ColorKey} from "../../styles/Color";

export interface TextButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    title?: string;
    color?: ColorKey;
}

const noop = () => {};
export function textButtonPropsWithDefaults(props: TextButtonProps) {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        color = 'Blue'
    } = props;
    return {
        onClick, title, color,
        disabled: disabled || !props.onClick,
    };
}
