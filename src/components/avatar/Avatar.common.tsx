export type AvatarLabelPlacement = "none"|"left"|"right";
export interface AvatarProps {
    user: User|null|undefined;
    labelPlacement?: AvatarLabelPlacement;
    style?: AvatarStyle;
}
export interface AvatarStyle {
    size?: number;
    labelColor?: string;
}
