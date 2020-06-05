import {ColorKey, Color, DisabledColor, HoverColor} from "./Color";
export * from "./Color";

/**
 * Color values for given states with a given ColorKey.
 */
export interface UIColorThemeStates {
    key: ColorKey;
    base: string;
    disabled: string;
    hover: string;
}

/**
 * A theme containing `primary` and `secondary` colors with different shades for states.
 */
export class UIColorTheme {
    /** A string with the name of the primary and secondary colors */
    readonly ref: string;
    readonly primary: UIColorThemeStates;
    readonly secondary: UIColorThemeStates;

    constructor(primary: ColorKey, secondary: ColorKey) {
        this.ref = primary + '_' + secondary;
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

    /** Swap round the primary and secondary colors. */
    get inverted(): UIColorTheme {
        return new UIColorTheme(this.secondary.key, this.primary.key);
    }
}

/** A list of available themes. */
export enum UIColorThemeKey {
    White,
    Black,
    Grey,
    Red,
    Green,
    Blue
}
/** The keys used in UIColorThemeKey. */
type UIColorThemeKeyName = keyof typeof UIColorThemeKey;

/** Instances of each theme, mapped to a UIColorThemeKeyName */
export const UIColorThemeMap: Record<UIColorThemeKeyName, UIColorTheme> = Object.freeze({
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
export function getUIColorTheme(color: GetUIColorThemeInput, inverted=false): UIColorTheme {
    let result: UIColorTheme|undefined = undefined;
    if (color instanceof UIColorTheme) {
        result = color
    } else if (color) {
        const keyName = typeof color === 'string' ? color : UIColorThemeKey[color] as UIColorThemeKeyName;
        result = UIColorThemeMap[keyName];
    }
    if (!result) result = DefaultTheme;
    if (inverted) result = result.inverted;
    return result;
}
export type GetUIColorThemeInput = UIColorTheme|UIColorThemeKey|UIColorThemeKeyName|undefined|null;
