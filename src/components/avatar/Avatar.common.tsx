import {TextStyle, ViewStyle} from "react-native";
import PropTypes from 'prop-types';
import {UserModel} from "../../models";

export type AvatarLabelPlacement = "none"|"left"|"right";
export interface AvatarProps {
    user: UserModel|null|undefined;
    labelPlacement?: AvatarLabelPlacement;
    label?: string;
    size?: number;
    style?: ViewStyle;
    labelStyle?: TextStyle;
}

export const AvatarPropTypes: Record<keyof AvatarProps, any> = {
    user: PropTypes.object,
    labelPlacement: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
};
