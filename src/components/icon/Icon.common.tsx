import PropTypes from 'prop-types';
import {StyleProp, ViewStyle} from "react-native";

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
    size?: number;
    color?: string;
    flat?: boolean;
    style?: StyleProp<ViewStyle>;
}
export const IconPropTypes: Record<keyof IconProps, any> = {
    type: PropTypes.number.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    flat: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

export const iconStandardSize = 24;
