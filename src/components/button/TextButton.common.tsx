import {ColorKey} from "../../styles/Color";
import {DefaultTheme} from "../../styles/UIColorTheme";

export interface TextButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    title?: string;
    color?: ColorKey;
}

const noop = () => {};
export function textButtonPropsWithDefaults(props: TextButtonProps): Required<TextButtonProps> {
    const {
        onClick = noop,
        disabled = false,
        title = '',
        color = DefaultTheme.primary.key
    } = props;
    return {
        onClick, title, color,
        disabled: disabled || !props.onClick,
    };
}
