import {IconType} from '../icon/Icon';
import {ColorKey} from "../../styles/Color";
export {IconType} from '../icon/Icon';

export interface IconButtonProps {
    icon?: IconType;
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    transparent?: boolean;
    style?: IconButtonStyle;
    color?: ColorKey;
}
export interface IconButtonStyle {
    width?: number;
    height?: number;
}

const noop = () => {};
export function iconButtonPropsWithDefaults(props: IconButtonProps) {
    const {
        onClick = noop,
        disabled = false,
        transparent = false,
        icon = IconType.QuestionMark,
        text = '',
        color = props.transparent ? 'Blue' : 'White',
        style = {}
    } = props;
    return {
        onClick, icon, style, text, transparent, color,
        disabled: disabled || !props.onClick,
    };
}
