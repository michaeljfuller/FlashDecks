import React, {SyntheticEvent, useCallback} from "react";
import {withStyles} from '@material-ui/core/styles';
import Snackbar, {SnackbarCloseReason} from '@material-ui/core/Snackbar'; // https://material-ui.com/components/snackbars/
import SnackbarContent from '@material-ui/core/SnackbarContent'; // https://material-ui.com/api/snackbar-content/;
import {ToastProps} from "./Toast.common";
import Button, {ButtonProps} from "../button/Button";
import withDefaultProps from "../../utils/hoc/withDefaultProps/withDefaultProps";

export const Toast = React.memo(function Toast(props: ToastProps) {
    // On close (timeout, click on screen, or `show` set to false)
    const onClose = useCallback((event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
        return props.onClose(false, reason === "timeout");
    }, [props.onClose]);

    // On action clicked
    const onClick = useCallback(() => {
        props.onClose(true, false);
    }, [props.onClose]);

    // Get components styled by ToastType
    const Content = getContentComponent(props.type);
    const Action = getActionComponent(props.type);

    return <Snackbar
        open={props.show}
        onClose={onClose}
        autoHideDuration={props.duration || null}
    >
        <Content
            message={props.text}
            action={<Action
                title={props.actionText||"OK"}
                onClick={onClick}
            />}
        />
    </Snackbar>;
});
export default Toast;

//<editor-fold desc="Content Components">

function getContentComponent(type: ToastProps['type']) {
    switch (type) {
        case "success": return SuccessContent;
        case "warning": return WarningContent;
        case "error": return ErrorContent;
    }
    return DefaultContent;
}

const DefaultContent = SnackbarContent;
const SuccessContent = styleContent('green');
const WarningContent = styleContent('orange');
const ErrorContent = styleContent('red');

function styleContent(backgroundColor: string) {
    return withStyles({
        root: { backgroundColor }
    })(SnackbarContent) as typeof SnackbarContent;
}


//</editor-fold>
//<editor-fold desc="Action Components">

function getActionComponent(type: ToastProps['type']) {
    switch (type) {
        case "success": return SuccessButton;
        case "warning": return WarningButton;
        case "error": return ErrorButton;
    }
    return DefaultButton;
}

const DefaultButton = styleButton('Grey');
const SuccessButton = styleButton('Green');
const WarningButton = styleButton('Orange');
const ErrorButton = styleButton('Red');

function styleButton(color: ButtonProps['color']) {
    return withDefaultProps(Button, { color } as ButtonProps);
}

//</editor-fold>
