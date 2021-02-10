import React from "react";
import {ViewStyle} from "react-native";
// @ts-ignore https://www.npmjs.com/package/react-native-material-indicators#progress-circle
import {ProgressCircle as IndicatorCircle} from "react-native-material-indicators";
import {CommonProgressProps, ProgressBase} from "./commonProgress";
import {Color, ColorKey} from "../../styles/Color";
import {Visibility} from "../layout/Visibility";

export interface ProgressCircleProps extends CommonProgressProps {
    size?: number;
    thickness?: number;
    style?: ViewStyle;
    color?: ColorKey;
}

export class ProgressCircle extends ProgressBase<ProgressCircleProps> {
    render() {
        const {size=40, thickness=4, color="Blue", visible=true, render=true} = this.props;

        return <Visibility style={this.props.style} visible={visible} render={render}>
            <IndicatorCircle
                key={'ProgressCircle_'+this.state.iteration /*Create new instance if changes to reset animation*/}
                visible
                determinate={this.getDeterminate()}
                value={this.getProgressFraction() * 100}
                color={Color[color]}
                size={size}
                thickness={thickness}
                animationMethod="timing"
                animationConfig={{ duration: 500 }}
                shouldAnimateFirstValue
            />
        </Visibility>;
    }
}

export default ProgressCircle;
