export const Color = Object.freeze({
    White: '#EEE',
    Grey: '#777',
    Black: '#111',
    Red: '#F44',
    Green: '#4b3',
    Blue: '#46F',
});
export const LightColor = setColors({
    White: '#FFF',
    Grey: '#999',
    Black: '#444',
});
export const DarkColor = setColors({
    White: '#BBB',
    Grey: '#555',
    Black: '#000',
    Red: '#D33',
    Green: '#392',
    Blue: '#35D',
});
export const HoverColor = setColors({}, DarkColor);
export const DisabledColor = setColors({
    White: '#EEE',
    Grey: '#999',
    Black: '#333',
    Red: '#C88',
    Green: '#8C8',
    Blue: '#88C'
});

/** Set new colour values, with defaults. */
function setColors(input: Partial<typeof Color>, baseColour = Color): typeof Color {
    return Object.freeze(
        Object.assign({}, baseColour, input)
    );
}
