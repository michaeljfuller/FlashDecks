import React, {useCallback} from "react";
import {reduxConnector, RootToastStoreProps} from "./RootToast_redux";
import Toast from "../../components/toast/Toast";
import {ToastProps} from "../../components/toast/Toast.common";
import {toastStore} from "../../store/toast/ToastStore";

/**
 * Show toast that is stored in the ToastStore queue.
 */
export const RootToast = React.memo(reduxConnector(
    function RootToast(props: RootToastStoreProps) {
        const currentToast = props.toast[0];
        const {onClose: onCloseNext, ref, ...toastProps} = currentToast || {};

        // When the toast is closed, call the callback and remove item from the queue.
        const onClose = useCallback<NonNullable<ToastProps['onClose']>>((action, timeout) => {
            onCloseNext && onCloseNext(action, timeout);
            toastStore.shift();
        }, [onCloseNext]);

        // Show the current toast.
        // Use `key` with unique ID so a new instance is created for each item, and the `duration` timer is reset.
        return currentToast ? <Toast
            key={ref+'_'+currentToast.id}
            show={true}
            onClose={onClose}
            {...toastProps}
        /> : null;
    }
));

export default RootToast;
