export enum IconType {
    QuestionMark,
    Menu,
    Home,
    Exit,
    Back,
    Edit,
    Delete,
    More,
    Info
}
export interface IconProps {
    type: IconType;
    style?: IconStyles;
}
export interface IconStyles {
    width?: number;
    height?: number;
    color?: string;
}
