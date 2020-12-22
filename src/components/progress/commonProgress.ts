import PropTypes from "prop-types";
import {PropTypesMap} from "../../utils/component";
import {Color, ColorKey} from "../../styles/Color";

export interface CommonProgressProps {
    determinate?: boolean;
    visible?: boolean;
    value?: number; // Range 0-maxValue
    maxValue?: number;
    color?: ColorKey;
}
export const CommonProgressPropTypes: PropTypesMap<CommonProgressProps> = {
    determinate: PropTypes.bool,
    visible: PropTypes.bool,
    value: PropTypes.number,
    maxValue: PropTypes.number,
    color: PropTypes.string,
};

export function getDeterminate(props: CommonProgressProps): boolean {
    return props.determinate !== undefined ? props.determinate : props.value !== undefined;
}

export function getProgressFraction(props: CommonProgressProps): number {
    let {value, maxValue} = props;
    value = value || 0; // Ensure not undefined or NaN
    maxValue = maxValue || 1; // Ensure not undefined, NaN or 0
    return value / maxValue;
}

export function getColor(props: CommonProgressProps): string {
    return Color[props.color||"Blue"];
}
