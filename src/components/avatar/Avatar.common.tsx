import {TextStyle, ViewStyle} from "react-native";
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
