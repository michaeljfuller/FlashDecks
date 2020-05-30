import {mapToObject} from "../utils/object";

export const Color = Object.freeze({
    White: '#FFF',
    Grey: '#777',
    Black: '#000',
    Red: '#F44',
    Green: '#4b3',
    Blue: '#46F',
});
export const HoverColor = setColors({
    White: '#BBB',
    Grey: '#555',
    Black: '#000',
    Red: '#D33',
    Green: '#392',
    Blue: '#35D',
});
export const DisabledColor = setColors({
    White: '#EEE',
    Grey: '#999',
    Black: '#333',
    Red: '#C88',
    Green: '#8C8',
    Blue: '#88C'
});

export type IColor = typeof Color;
export type ColorKey = keyof IColor;
export const ColorKeys = mapToObject<IColor, ColorKey, ColorKey, any>(Color, (_, key) => ({ value: key as ColorKey }));

/** Set new colour values, with defaults. */
function setColors(input: Partial<IColor>, baseColour = Color): IColor {
    return Object.freeze(
        Object.assign({}, baseColour, input)
    );
}
