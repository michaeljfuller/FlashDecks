import React from "react";
import {View, ViewStyle} from "react-native";
import PropTypes from "prop-types";
// @ts-ignore https://www.npmjs.com/package/react-native-material-indicators#progress-circle
import {ProgressCircle as IndicatorCircle} from "react-native-material-indicators";
import {CommonProgressProps, CommonProgressPropTypes, getDeterminate, getProgressFraction, getColor} from "./commonProgress";
import {ComponentUnion} from "../../utils/component";

export interface ProgressCircleProps extends CommonProgressProps {
    radius?: number;
    thickness?: number;
    style?: ViewStyle;
}

export const ProgressCircle: ComponentUnion<ProgressCircleProps> = React.memo(function ProgressCircle(props: ProgressCircleProps) {
    const {radius=40, thickness=4} = props;
    const determinate = getDeterminate(props);
    const fraction = getProgressFraction(props);
    const color = getColor(props);

    return <View style={props.style}>
        <IndicatorCircle
            visible
            determinate={determinate}
            value={fraction*100}
            size={radius}
            thickness={thickness}
            color={color}
            animationMethod="timing"
            animationConfig={{ duration: 500 }}
            shouldAnimateFirstValue
        />
    </View>;
});
ProgressCircle.propTypes = {
    ...CommonProgressPropTypes,
    radius: PropTypes.number,
    thickness: PropTypes.number,
    style: PropTypes.object,
};
export default ProgressCircle;
