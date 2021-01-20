import React from "react";
import {StyleSheet, Text} from "react-native";
import {Button} from "../../../components/button/Button";
import {ToastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import {ToastQueueItem} from "../../../store/toast/toast_actions";
import {randomIntString} from "../../../utils/math";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import Row from "../../../components/layout/Row";

interface TempScreenMiscProps {}
interface TempScreenMiscState {
    navBlocked: boolean;
}
export class TempScreenMisc extends React.PureComponent<TempScreenMiscProps, TempScreenMiscState> {
    state: TempScreenMiscState = {
        navBlocked: false,
    };
    toastStore = new ToastStore(this);

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

    addToast(type: ToastQueueItem['type'], duration = 500, text = '', title = type?.toUpperCase()) {
        this.toastStore.add({
            text: text || `Example ${type} Toast. #${randomIntString(5)}`,
            title,
            actionText: 'Close',
            onClose: (action: boolean, timeout: boolean) => {
                console.log('onCloseToast', JSON.stringify({ action, timeout }));
            },
            duration,
            type,
        });
    }

    render() {
        const {navBlocked} = this.state;
        return <TempScreenSubsection title="Misc">

            <Text>Toast</Text>
            <Row wrap center>
                <Button square style={styles.rowButton}
                        title="Pop Toast"
                        onClick={() => this.addToast(
                            "default",
                            0,
                            "Example toast with a longer message to see how it looks and if it wraps onto multiple lines on "+
                            "a smaller screen, such as on a phone, tablet, or another mobile device.",
                            ''
                        )}
                />
                <Button square style={styles.rowButton}
                        title="Pop Multiple Toast"
                        onClick={() => {
                            this.addToast("success");
                            this.addToast("warning");
                            this.addToast("error");
                            this.addToast("default", 0);
                        }}
                />
                <Button square style={styles.rowButton}
                        title={navBlocked ? "Unblock Navigation" : "Block Navigation"}
                        onClick={navBlocked ? this.onUnblockNav : this.onBlockNav}
                />
            </Row>

        </TempScreenSubsection>;
    }
}
export default TempScreenMisc;

const styles = StyleSheet.create({
    rowButton: {
        flex: 1,
        minWidth: 120,
    },
});
