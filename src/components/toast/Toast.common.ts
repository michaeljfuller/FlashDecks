import React from 'react';

export interface ToastProps {
    /** If the Toast should show. */
    show: boolean;

    /** Callback on the Toast closing, and if the action button was pressed. Defaults to "OK".  */
    onClose?: (action: boolean, timeout: boolean) => void;

    /** Toast message */
    text: string;
    title?: string;

    /** Text of the action button */
    actionText?: string;

    /** Determines the style. */
    type?: ToastType;

    /** Duration in milliseconds. Default is indefinite. */
    duration?: number;

    canDismiss?: boolean;
}

export type ToastType = "default"|"success"|"error"|"warning";

export interface BaseToastState {
    enabled: boolean;
}
export class ToastBase<State extends BaseToastState = BaseToastState> extends React.PureComponent<ToastProps, State> {
    private timeoutId: any

    state = {
        enabled: false,
    } as State;

    componentDidMount() {
        if (this.props.show) {
            this.onShow();
        }
    }

    componentDidUpdate(prevProps: Readonly<ToastProps>/*, prevState: Readonly<{}>, snapshot?: any*/) {
        if (!prevProps.show && this.props.show) {
            this.onShow();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    startTimer() {
        if (this.props.duration) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(this.onTimeout, this.props.duration);
        }
    }

    onShow() {
        this.startTimer();
    }
    readonly onTimeout = () => {
        if (this.props.onClose) {
            this.props.onClose(false, true);
        }
    }

    readonly onAction = () => {
        if (this.state.enabled && this.props.onClose) {
            this.props.onClose(true, false);
        }
    }
    readonly onDismiss = () => {
        if (this.state.enabled && this.props.canDismiss !== false) {
            this.props.onClose && this.props.onClose(false, false);
        }
    }

}
