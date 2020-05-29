export enum IconType {
    QuestionMark,
    Menu,
    Home,
    Exit,
    Back,
    Edit,
    View
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
