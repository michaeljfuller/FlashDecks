import React from "react";
import {Toast as NativeToast} from "native-base"; // https://docs.nativebase.io/Components.html#toast-button-style-headref
import {ToastProps, ToastType} from "./Toast.common";

export class Toast extends React.Component<ToastProps, any> {

    componentDidUpdate(prevProps: Readonly<ToastProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        if (prevProps.show !== this.props.show) {
            this.props.show ? this.show() : this.hide();
        }
    }

    show() {
        NativeToast.show({
            text: this.props.text,
            onClose: this.onClose,
            buttonText: this.props.actionText || 'OK',
            type: convertType(this.props.type),
            duration: this.props.duration || 0,
        });
    }

    hide() {
        NativeToast.hide(); // reason = "functionCall"
    }

    onClose = (reason: "user" | "timeout" | "functionCall") => {
        this.props.onClose(reason === "user", reason === "timeout");
    }

    render() {
        return null; // Nothing to render in-place
    }
}

/** Convert ToastType for native-base Toast */
function convertType(type: ToastType|undefined) {
    switch (type) {
        case "success": return "success";
        case "warning": return "warning";
        case "error": return "danger";
    }
    return undefined;
}
