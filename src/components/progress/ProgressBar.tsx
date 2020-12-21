import React from "react";
import {View, ViewStyle} from "react-native";
import PropTypes from "prop-types";
// @ts-ignore https://www.npmjs.com/package/react-native-material-indicators#progress-bar
import {ProgressBar as IndicatorBar} from "react-native-material-indicators";
import {CommonProgressProps, CommonProgressPropTypes, getDeterminate, getProgressFraction, getColor} from "./commonProgress";
import {ComponentUnion} from "../../utils/component";

export interface ProgressBarProps extends CommonProgressProps {
    style?: ViewStyle;
}

export const ProgressBar: ComponentUnion<ProgressBarProps> = React.memo(function ProgressBar(props: ProgressBarProps) {
    const determinate = getDeterminate(props);
    const fraction = getProgressFraction(props);
    const color = getColor(props);

    return <View style={props.style}>
        <IndicatorBar
            visible
            determinate={determinate}
            value={fraction * 100}
            color={color}
        />
    </View>;
});
ProgressBar.propTypes = {
    ...CommonProgressPropTypes,
    style: PropTypes.object,
};
export default ProgressBar;
