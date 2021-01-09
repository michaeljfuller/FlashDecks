import React from "react";
import {View, ViewStyle} from "react-native";
// @ts-ignore https://www.npmjs.com/package/react-native-material-indicators#progress-circle
import {ProgressCircle as IndicatorCircle} from "react-native-material-indicators";
import {CommonProgressProps, ProgressBase} from "./commonProgress";
import {Color, ColorKey} from "../../styles/Color";

export interface ProgressCircleProps extends CommonProgressProps {
    radius?: number;
    thickness?: number;
    style?: ViewStyle;
    color?: ColorKey;
}

export class ProgressCircle extends ProgressBase<ProgressCircleProps> {
    render() {
        const {radius=40, thickness=4, color="Blue", visible=true} = this.props;

        if (!visible) return null;

        return <View style={this.props.style}>
            <IndicatorCircle
                key={'ProgressCircle_'+this.state.iteration /*Create new instance if changes to reset animation*/}
                visible
                determinate={this.getDeterminate()}
                value={this.getProgressFraction() * 100}
                color={Color[color]}
                size={radius}
                thickness={thickness}
                animationMethod="timing"
                animationConfig={{ duration: 500 }}
                shouldAnimateFirstValue
            />
        </View>;
    }
}

export default ProgressCircle;
