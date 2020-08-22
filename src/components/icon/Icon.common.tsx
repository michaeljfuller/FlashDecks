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
}
export interface IconProps {
    type: IconType;
    style?: IconStyles;
}
export const IconPropTypes: Record<keyof IconProps, any> = {
    type: PropTypes.number.isRequired,
    style: PropTypes.object,
};

export interface IconStyles {
    width?: number;
    height?: number;
    color?: string;
    padding?: number;
}
