import React from "react";
import {ReactReduxContext, ReactReduxContextValue} from "react-redux";
import {reduxConnector, RootToastStoreProps} from "./RootToast_redux";
import Toast from "../../components/toast/Toast";
import {ToastProps} from "../../components/toast/Toast.common";
import ToastStore from "../../store/toast/ToastStore";
import {StoreState} from "../../store/store_manifest";
import {ToastStateQueueItem} from "../../store/toast/toast_reducer";

/**
 * Show toast that is stored in the ToastStore queue.
 */
export class RootToast extends React.PureComponent<RootToastStoreProps> {
    static contextType: React.Context<ReactReduxContextValue<StoreState>> = ReactReduxContext;
    private toastStore: ToastStore|undefined;

    get storeContext() { return this.context as ReactReduxContextValue<StoreState>; }
    get currentToast(): ToastStateQueueItem|undefined { return this.props.toast[0]; }

    componentDidMount() {
        this.toastStore = new ToastStore(this, this.storeContext.store);
    }

    componentWillUnmount() {
        this.toastStore?.removeByRef();
    }

    onCloseCurrent: ToastProps['onClose'] = (action, timeout) => {
        const onClose = this.currentToast?.onClose as ToastStateQueueItem['onClose'];
        onClose && onClose(action, timeout);
        this.toastStore?.shift();
    };

    render() {
        const toast = this.currentToast;
        if (!toast) return null;

        // Show the current toast.
        // Use `key` with unique ID so a new instance is created for each item, and the `duration` timer is reset.
        const {ref, ...toastProps} = toast;
        return <Toast show
            {...toastProps}
            key={ref+'_'+toast.id}
            onClose={this.onCloseCurrent}
        />;
    }

}
export default reduxConnector(RootToast);
