import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "../../../components/button/Button";
import {ToastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import {ToastQueueItem} from "../../../store/toast/toast_actions";
import {randomIntString} from "../../../utils/math";
import {padNumber} from "../../../utils/string";
import {repeat} from "../../../utils/array";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import Row from "../../../components/layout/Row";
import Column from "../../../components/layout/Column";

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


            <Text>Centering Row & Column</Text>
            <Row style={{ height: 60 }}>
                <Row center style={{ flex:1, borderWidth: 1, margin: 2 }}>
                    <Column center style={{ borderLeftWidth: 1, borderRightWidth: 1 }}>
                        <Text style={{ backgroundColor: '#79F', textAlign: "center", padding: 5 }}>Row & Column</Text>
                    </Column>
                </Row>
                <Column center style={{ flex:1, borderWidth: 1, margin: 2 }}>
                    <Row center style={{ borderTopWidth: 1, borderBottomWidth: 1 }}>
                        <Text style={{ backgroundColor: '#79F', textAlign: "center", padding: 5 }}>Column & Row</Text>
                    </Row>
                </Column>
            </Row>


            <Text>Scrolling Row & Column</Text>
            <Row center>
                <Row scroll style={{margin: 2, borderWidth: 1, maxWidth: '70%'}}>
                    {repeat(50, index => <Text key={index} style={styles.rowScrollText}>{padNumber(index+1, 2)}</Text>)}
                </Row>
            </Row>
            <Row style={{borderWidth: 1, borderBottomWidth: 0, marginHorizontal: 2, marginTop: 2}}>
                <Text style={{textAlign: "center", fontWeight: "bold", flex:1, borderRightWidth: 1}}>Scroll, Center & Space</Text>
                <Text style={{textAlign: "center", fontWeight: "bold", flex:1}}>Scroll & Center</Text>
            </Row>
            <Row style={{height: 150, marginHorizontal: 2, borderWidth: 1}}>
                <Column scroll center space style={{ borderRightWidth: 1 }}>
                    {repeat(3, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
                <Column scroll center space style={{ borderRightWidth: 1 }}>
                    {repeat(20, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
                <Column scroll center style={{ borderRightWidth: 1 }}>
                    {repeat(3, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
                <Column scroll center>
                    {repeat(20, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
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
    centerText: {
        textAlign: "center"
    },
    rowScrollText: {
        fontSize: 50,
        textAlign: 'center',
        color: '#79F',
        marginHorizontal: 7,
    }
});
