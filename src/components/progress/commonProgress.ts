import React from "react";

export interface CommonProgressProps {
    determinate?: boolean;
    visible?: boolean;
    render?: boolean;
    value?: number; // Range 0-maxValue
    maxValue?: number;
    testID?: string;
}

export interface CommonProgressState {
    /** Iteration changes when a major change is made, such as changing if determinate or progress value. */
    iteration?: number;
}

export abstract class ProgressBase<
    Props extends CommonProgressProps = CommonProgressProps,
    State extends CommonProgressState = CommonProgressState
> extends React.PureComponent<Props, State> {
    state = {
        iteration: 0
    } as State;

    protected getDeterminate(props = this.props as Props): boolean {
        return props.determinate !== undefined ? props.determinate : props.value !== undefined;
    }
    protected getProgressFraction(props = this.props as Props): number {
        let {value, maxValue} = props;
        value = value || 0; // Ensure not undefined or NaN
        maxValue = maxValue || 1; // Ensure not undefined, NaN or 0
        return value / maxValue;
    }

    componentDidUpdate(prevProps: Readonly<Props>/*, prevState: Readonly<{}>, snapshot?: {}*/) {
        // New iteration of the counter if drastic change, like changing determinate or value
        const currDeterminate = this.getDeterminate(this.props), prevDeterminate = this.getDeterminate(prevProps);
        const currProgress = this.getProgressFraction(this.props), prevProgress = this.getProgressFraction(prevProps);
        if (
            currDeterminate !== prevDeterminate
        ||  currProgress/prevProgress < 0.3
        ) {
            this.setState({
                iteration: (this.state.iteration||0) + 1,
            });
        }
    }
}
