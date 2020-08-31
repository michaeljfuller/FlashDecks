import React, {PropsWithChildren} from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";
import ImmutablePureComponent from "../../components/ImmutablePureComponent";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, TempScreenStoreProps} from "./TempScreen_redux";
import {envName} from "../../env";

import {Button} from "../../components/button/Button";
import {TextButton} from "../../components/button/TextButton";
import {IconButton, IconType} from "../../components/button/IconButton";
import {repeat} from "../../utils/array";
import {AlertModal} from "../../components/modal/AlertModal/AlertModal";
import {DebugModal} from "../../components/modal/DebugModal/DebugModal";
import {ToastStore} from "../../store/toast/ToastStore";
import {randomIntString} from "../../utils/math";
import {ToastQueueItem} from "../../store/toast/toast_actions";
import navigationStore from "../../store/navigation/NavigationStore";

export enum TestIds {
    User='TempScreen_User',
    Env='TempScreen_Env'
}

const TestContext = React.createContext('TestContext');

export type TempScreenProps = NavigationScreenProps;
export type TempScreenState = Readonly<{
    contextValue1: number;
    contextValue2: number;
    showDebugModal: boolean;
    showAlertModal: boolean;
}>;

export class TempScreen extends ImmutablePureComponent<
    TempScreenProps & TempScreenStoreProps,
    TempScreenState
> {
    readonly state = {
        contextValue1: 1,
        contextValue2: 2,
        showDebugModal: false,
        showAlertModal: false,
    } as TempScreenState;
    toastStore = new ToastStore(this);

    componentWillUnmount() {
        this.toastStore.removeByRef();
        this.onUnblockNav();
    }

    render() {
        const {loggedInUser} = this.props;
        return (
            <ScreenContainer style={{ paddingHorizontal: 10 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                    <Text testID={TestIds.User}>User: {loggedInUser && loggedInUser.displayName || '?'}</Text>
                    <Text testID={TestIds.Env}>Environment: &quot;{envName}&quot;</Text>
                </View>

                {this.renderMisc()}
                {this.renderButtons()}
                {this.renderContexts()}
                {this.renderModals()}

                {repeat(30, index => {
                    return <Text key={index} style={{ fontSize: 50, textAlign: 'center', color: '#79F' }}>{index+1}</Text>
                })}

            </ScreenContainer>
        );
    }

    renderButtons() {
        const noop = () => {};
        return <React.Fragment>
            <MemoRow>
                <Button title="Button" onClick={noop} square />
                <TextButton title="TextButton" onClick={noop} color="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" text="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" flat />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" transparent />
            </MemoRow>
            <MemoRow borderColor='red' backgroundColor='#fee'>
                <Button title="Button" onClick={noop} color="Red" flat={true} square />
                <TextButton title="TextButton" onClick={noop} color="Red" />
                <IconButton icon={IconType.Home} onClick={noop} text="Red" color="Red" />
                <IconButton icon={IconType.Home} onClick={noop} text="Home" color="Red" transparent />
            </MemoRow>
            <MemoRow borderColor='green' backgroundColor='#efe'>
                <Button title="Button" onClick={noop} color="Green" square />
                <TextButton title="TextButton" onClick={noop} color="Green" />
                <IconButton icon={IconType.Menu} onClick={noop} text="Green" color="Green" />
                <IconButton icon={IconType.Menu} onClick={noop} text="Menu" color="Green" transparent />
            </MemoRow>
            <MemoRow borderColor='grey' backgroundColor='#eee'>
                <Button title="Disabled Button" square />
                <TextButton title="Disabled TextButton" onClick={noop} disabled={true} color="Grey" />
                <IconButton icon={IconType.QuestionMark} color="White" />
                <IconButton icon={IconType.QuestionMark} color="Black" transparent />
            </MemoRow>
        </React.Fragment>;
    }

    renderContexts() {
        return <View style={{
            borderWidth: 1,
            flexDirection: "column",
        }}>
            <TestContext.Provider value={'TestContext1: '+this.state.contextValue1}>
                <TestContext.Consumer>
                    {value => <TextButton title={value} onClick={() => this.setStateTo(draft => draft.contextValue1++)} />}
                </TestContext.Consumer>
                <TestContext.Provider value={'TestContext2: '+this.state.contextValue2}>
                    <TestContext.Consumer>
                        {value => <TextButton title={value} onClick={() => this.setStateTo(draft => draft.contextValue2++)} />}
                    </TestContext.Consumer>
                </TestContext.Provider>
            </TestContext.Provider>
        </View>;
    }

    renderModals() {
        return <View style={{
            marginTop: 2,
            borderWidth: 1,
        }}>

            <TextButton title={'showDebugModal ' + this.state.showDebugModal} onClick={() => this.setStateTo(draft => draft.showDebugModal = !draft.showDebugModal)} />
            <DebugModal
                open={this.state.showDebugModal}
                onClose={() => this.setStateTo({ showDebugModal: false })}
                title="Test Modal"
                data={repeat(75, i => 48 + i).map(code => ({ code, character: String.fromCharCode(code) }))}
            >
                <Text>Character Codes</Text>
            </DebugModal>

            <TextButton title={'showAlertModal ' + this.state.showAlertModal} onClick={() => this.setStateTo(draft => draft.showAlertModal = !draft.showAlertModal)} />
            <AlertModal
                open={this.state.showAlertModal}
                onClose={() => this.setStateTo({ showAlertModal: false })}
                title="Alert"
                message="Message"
            >
                <Text>AlertModal Contents</Text>
                <View style={{ borderWidth: 1, paddingHorizontal: 1 }}>
                    <TextInput multiline />
                </View>
                <TextButton title={'showDebugModal ' + this.state.showDebugModal} onClick={() => this.setStateTo(draft => draft.showDebugModal = !draft.showDebugModal)} />
            </AlertModal>

        </View>;
    }

    renderMisc() {
        const {navBlocked} = this.props;
        return <View style={{ marginTop: 2, borderWidth: 1 }}>
            <View style={styles.row}>
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
            </View>
        </View>;
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
    }
    onUnblockNav = () => navigationStore.unblock("TempScreen");

}

function Row(props: PropsWithChildren<{
    borderColor?: string;
    backgroundColor?: string;
    marginHorizontal?: number;
    marginVertical?: number;
    borderWidth?: number;
}>) {
    const {
        borderColor = 'black',
        marginHorizontal = 0,
        marginVertical = 2,
        borderWidth = 1,
        backgroundColor = 'white',
    } = props;
    return <View style={{
        marginHorizontal,
        marginVertical,
        borderColor,
        borderWidth,
        backgroundColor,
        display: 'flex',
        flexDirection: 'row'
    }}>{props.children}</View>
}
const MemoRow = React.memo(Row);

export default reduxConnector(TempScreen);

const styles = StyleSheet.create({
    row: { flexDirection: "row" },
    wrap: { flexWrap: "wrap" },
    rowButton: {
        flex: 1,
        minWidth: 120,
    },
});
