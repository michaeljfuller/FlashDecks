import {TextStyle, ViewStyle} from "react-native";

export type AvatarLabelPlacement = "none"|"left"|"right";
export interface AvatarProps {
    user: User|null|undefined;
    labelPlacement?: AvatarLabelPlacement;
    label?: string;
    size?: number;
    style?: ViewStyle;
    labelStyle?: TextStyle;
}
