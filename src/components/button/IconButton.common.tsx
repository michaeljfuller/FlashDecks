import {IconType} from '../icon/Icon';
export {IconType} from '../icon/Icon';

export interface IconButtonProps {
    icon?: IconType;
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    style?: IconButtonStyle;
}
export interface IconButtonStyle {
    width?: number;
    height?: number;
    color?: string;
}

const noop = () => {};
export function iconButtonPropsWithDefaults(props: IconButtonProps) {
    const {
        onClick = noop,
        disabled = false,
        icon = IconType.QuestionMark,
        text = '',
        style = {}
    } = props;
    return {
        onClick, icon, style, text,
        disabled: disabled || !props.onClick,
    };
}
