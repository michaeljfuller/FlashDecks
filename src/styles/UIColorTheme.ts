import {ColorKey, Color, DisabledColor, HoverColor} from "./Color";
export * from "./Color";

export interface UIColorThemeStates {
    key: ColorKey;
    base: string;
    disabled: string;
    hover: string;
}
export class UIColorTheme {
    readonly name: string;
    readonly primary: UIColorThemeStates;
    readonly secondary: UIColorThemeStates;

    constructor(primary: ColorKey, secondary: ColorKey) {
        this.name = primary + '_' + secondary;
        this.primary = Object.freeze({
            key: primary,
            base: Color[primary],
            disabled: DisabledColor[primary],
            hover: HoverColor[primary],
        });
        this.secondary = Object.freeze({
            key: secondary,
            base: Color[secondary],
            disabled: DisabledColor[secondary],
            hover: HoverColor[secondary],
        });
    }

    get inverted(): UIColorTheme {
        return new UIColorTheme(this.secondary.key, this.primary.key);
    }
}

export const UIColorThemeMap: Record<ColorKey, UIColorTheme> = Object.freeze({
    White: new UIColorTheme('White', 'Black'),
    Black: new UIColorTheme('Black', 'White'),
    Grey:  new UIColorTheme('Grey',  'White'),

    Red:   new UIColorTheme('Red',   'White'),
    Green: new UIColorTheme('Green', 'White'),
    Blue:  new UIColorTheme('Blue',  'White'),
});
export const DefaultTheme = UIColorThemeMap.Blue;

/**
 * For a given color, return a collection that includes a contrasting secondary color, and iterations for different UI states
 */
export function getUIColorTheme(color: ColorKey|undefined, inverted = false): UIColorTheme {
    const result = (color && UIColorThemeMap[color]) || DefaultTheme;
    return inverted ? result.inverted : result;
}
export default getUIColorTheme;
