import {IconType} from '../icon/Icon';
export {IconType} from '../icon/Icon';

export interface IconButtonProps {
    icon?: IconType;
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
        style = {}
    } = props;
    return {
        onClick, icon, style,
        disabled: disabled || !props.onClick,
    };
}
