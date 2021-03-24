import React from "react";
import {ViewStyle} from "react-native";
// @ts-ignore https://www.npmjs.com/package/react-native-material-indicators#progress-bar
import {ProgressBar as IndicatorBar} from "react-native-material-indicators";
import {ProgressBase, CommonProgressProps} from "./commonProgress";
import {Color, ColorKey} from "../../styles/Color";
import {Visibility} from "../layout/Visibility";

export interface ProgressBarProps extends CommonProgressProps {
    style?: ViewStyle;
    color?: ColorKey;
}

export class ProgressBar extends ProgressBase<ProgressBarProps> {
    render() {
        const {color="Blue", visible=true, render=true, testID} = this.props;

        return <Visibility style={this.props.style} visible={visible} render={render} testID={testID}>
            <IndicatorBar
                key={'ProgressBar_'+this.state.iteration /*Create new instance if changes to reset animation*/}
                visible
                determinate={this.getDeterminate()}
                value={this.getProgressFraction() * 100}
                color={Color[color]}
            />
        </Visibility>;
    }
}

export default ProgressBar;
