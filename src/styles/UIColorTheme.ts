import {ColorKey, Color, DisabledColor, HoverColor} from "./Color";
export * from "./Color";

export interface UIColorThemeStates {
    base: string;
    disabled: string;
    hover: string;
}
export interface UIColorTheme {
    primary: UIColorThemeStates;
    secondary: UIColorThemeStates;
}
function createUIColorTheme(primary: ColorKey, secondary: ColorKey): UIColorTheme {
    return {
        primary: {
            base: Color[primary],
            disabled: DisabledColor[primary],
            hover: HoverColor[primary],
        },
        secondary: {
            base: Color[secondary],
            disabled: DisabledColor[secondary],
            hover: HoverColor[secondary],
        }
    };
}

export const UIColorThemeMap: Record<ColorKey, UIColorTheme> = Object.freeze({
    White: createUIColorTheme('White', 'Black'),
    Black: createUIColorTheme('Black', 'White'),
    Grey:  createUIColorTheme('Grey',  'White'),

    Red:   createUIColorTheme('Red',   'White'),
    Green: createUIColorTheme('Green', 'White'),
    Blue:  createUIColorTheme('Blue',  'White'),
});

/**
 * For a given color, return a collection that includes a contrasting secondary color, and iterations for different UI states
 */
export function getUIColorTheme(color: ColorKey): UIColorTheme {
    return UIColorThemeMap[color];
}
export default getUIColorTheme;
