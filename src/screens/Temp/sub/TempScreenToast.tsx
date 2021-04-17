import React from "react";
import {StyleSheet, Text} from "react-native";
import {Button} from "../../../components/button/Button";
import {ToastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import {ToastQueueItem} from "../../../store/toast/toast_actions";
import {randomIntString} from "../../../utils/math";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import Row from "../../../components/layout/Row";
import {ToastProps} from "../../../components/toast/Toast.common";

interface TempScreenMiscProps {}
interface TempScreenMiscState {
    navBlocked: boolean;
    actionCount: number;
}
export class TempScreenToast extends React.PureComponent<TempScreenMiscProps, TempScreenMiscState> {
    state: TempScreenMiscState = {
        navBlocked: false,
        actionCount: 0,
    };
    toastStore = new ToastStore();

    componentWillUnmount() {
        this.toastStore.removeByRef();
        this.onUnblockNav();
    }

    onBlockNav = () => {
        navigationStore.block({
            ref: "TempScreen",
            reason: "TempScreen blocked navigation.",
            attemptCallback: reason => this.toastStore.add({
                text: reason,
                actionText: "Unblock",
                onClose: action => action && this.onUnblockNav(),
            }),
        });
        this.setState({navBlocked: true});
    }
    onUnblockNav = () => {
        navigationStore.unblock("TempScreen");
        this.setState({navBlocked: false});
    }

    addToast(item: Partial<ToastQueueItem>) {
        const {text, type, onClose, ...props} = item;
        this.toastStore.add({
            text: text || `Example ${type} Toast. #${randomIntString(5)}`,
            onClose: (action: boolean, timeout: boolean) => {
                console.log('onCloseToast', JSON.stringify({ action, timeout }));
                onClose && onClose(action, timeout);
            },
            type,
            ...props
        });
    }

    render() {
        const {navBlocked} = this.state;
        return <TempScreenSubsection title="Toast" description="Pop some toast, including one that appears when navigating away.">

            <Row wrap center>
                <Button square style={styles.rowButton}
                        title="Pop Toast"
                        onClick={() => this.addToast({
                            duration: 3000,
                            text: "Example toast with a longer message to see how it looks and if it wraps onto multiple lines on "+
                                "a smaller screen, such as on a phone, tablet, or another mobile device.",
                        })}
                />
                <Button square style={styles.rowButton}
                        title={"Action Toast: " + this.state.actionCount}
                        onClick={() => this.addToast({
                            duration: 0,
                            title: "Action Toast",
                            text: "Click 'Increment' to increase count, or click outside to discard.",
                            actionText: "Increment",
                            onClose: (action/*, timeout*/) => action && this.setState({actionCount: this.state.actionCount+1})
                        })}
                />
                <Button square style={styles.rowButton}
                        title="Pop Multiple Toast"
                        onClick={() => {
                            this.addToast({duration: 500, type: "success"});
                            this.addToast({duration: 500, type: "warning"});
                            this.addToast({duration: 500, type: "error"});
                            this.addToast({duration: 0,   type: "default"});
                        }}
                />
                <Button square style={styles.rowButton}
                        title={navBlocked ? "Unblock Navigation" : "Block Navigation Toast"}
                        onClick={navBlocked ? this.onUnblockNav : this.onBlockNav}
                />
            </Row>

        </TempScreenSubsection>;
    }
}
export default TempScreenToast;

const styles = StyleSheet.create({
    rowButton: {
        flex: 1,
        minWidth: 120,
    },
});
