import PropTypes from 'prop-types';

export enum IconType {
    QuestionMark,
    Menu,
    Home,
    Exit,
    Back,
    Edit,
    Delete,
    More,
    Info,
    Cancel,
    Done,
    Resize,
    Add,
    Remove,
}
export interface IconProps {
    type: IconType;
    style?: IconStyles;
    flat?: boolean;
}
export const IconPropTypes: Record<keyof IconProps, any> = {
    type: PropTypes.number.isRequired,
    style: PropTypes.object,
    flat: PropTypes.bool,
};

export interface IconStyles {
    width?: number;
    height?: number;
    color?: string;
    padding?: number;
}
export const iconStandardSize = 24;
