import React, {Component, PropsWithChildren} from "react";
import {Text, TextInput, View} from "react-native";
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
import {Toast} from "../../components/toast/Toast";
import {ToastProps, ToastType} from "../../components/toast/Toast.common";

export enum TestIds {
    User='TempScreen_User',
    Env='TempScreen_Env'
}

const TestContext = React.createContext('TestContext');

export type TempScreenProps = NavigationScreenProps;
interface TempScreenState {
    contextValue1: number;
    contextValue2: number;
    showDebugModal: boolean;
    showAlertModal: boolean;
    showToast: boolean;
    toastType: ToastType;
}

export class TempScreen extends Component<TempScreenProps & TempScreenStoreProps, TempScreenState>
{
    state = {
        contextValue1: 1,
        contextValue2: 2,
        showDebugModal: false,
        showAlertModal: false,
        showToast: false,
        toastType: "default",
    } as TempScreenState;

    render() {
        const {loggedInUser} = this.props;
        return (
            <ScreenContainer style={{ paddingHorizontal: 10 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                    <Text testID={TestIds.User}>User: {loggedInUser && loggedInUser.displayName || '?'}</Text>
                    <Text testID={TestIds.Env}>Environment: &quot;{envName}&quot;</Text>
                </View>

                {this.renderToast()}
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
            <Row>
                <Button title="Button" onClick={noop} square />
                <TextButton title="TextButton" onClick={noop} color="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" text="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" flat />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" transparent />
            </Row>
            <Row borderColor='red' backgroundColor='#fee'>
                <Button title="Button" onClick={noop} color="Red" flat={true} square />
                <TextButton title="TextButton" onClick={noop} color="Red" />
                <IconButton icon={IconType.Home} onClick={noop} text="Red" color="Red" />
                <IconButton icon={IconType.Home} onClick={noop} text="Home" color="Red" transparent />
            </Row>
            <Row borderColor='green' backgroundColor='#efe'>
                <Button title="Button" onClick={noop} color="Green" square />
                <TextButton title="TextButton" onClick={noop} color="Green" />
                <IconButton icon={IconType.Menu} onClick={noop} text="Green" color="Green" />
                <IconButton icon={IconType.Menu} onClick={noop} text="Menu" color="Green" transparent />
            </Row>
            <Row borderColor='grey' backgroundColor='#eee'>
                <Button title="Disabled Button" square />
                <TextButton title="Disabled TextButton" onClick={noop} disabled={true} color="Grey" />
                <IconButton icon={IconType.QuestionMark} color="White" />
                <IconButton icon={IconType.QuestionMark} color="Black" transparent />
            </Row>
        </React.Fragment>;
    }

    renderContexts() {
        return <View style={{
            borderWidth: 1
        }}>
            <TestContext.Provider value={'TestContext1: '+this.state.contextValue1}>
                <TestContext.Consumer>
                    {value => <TextButton title={value} onClick={() => this.setState({ contextValue1: this.state.contextValue1 + 1})} />}
                </TestContext.Consumer>
                <TestContext.Provider value={'TestContext2: '+this.state.contextValue2}>
                    <TestContext.Consumer>
                        {value => <TextButton title={value} onClick={() => this.setState({ contextValue2: this.state.contextValue2 + 1})} />}
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

            <TextButton title={'showDebugModal ' + this.state.showDebugModal} onClick={() => this.setState({ showDebugModal: !this.state.showDebugModal })} />
            <DebugModal
                open={this.state.showDebugModal}
                onClose={() => this.setState({ showDebugModal: false })}
                title="Test Modal"
                data={repeat(75, i => 48 + i).map(code => ({ code, character: String.fromCharCode(code) }))}
            >
                <Text>Character Codes</Text>
            </DebugModal>

            <TextButton title={'showAlertModal ' + this.state.showAlertModal} onClick={() => this.setState({ showAlertModal: !this.state.showAlertModal })} />
            <AlertModal
                open={this.state.showAlertModal}
                onClose={() => this.setState({ showAlertModal: false })}
                title="Alert"
                message="Message"
            >
                <Text>AlertModal Contents</Text>
                <View style={{ borderWidth: 1, paddingHorizontal: 1 }}>
                    <TextInput multiline />
                </View>
                <TextButton title={'showDebugModal ' + this.state.showDebugModal} onClick={() => this.setState({ showDebugModal: !this.state.showDebugModal })} />
            </AlertModal>

        </View>;
    }

    renderToast() {
        const toastBtn = (toastType: ToastType) => {
            return <TextButton
                title={toastType}
                disabled={toastType === this.state.toastType}
                onClick={() => this.setState({ toastType })}
            />;
        }
        return <View style={{
            marginTop: 2,
            borderWidth: 1,
            flexDirection: "row",
        }}>
            <Button title="Toggle Toast" onClick={this.onToggleToast} />
            {toastBtn("default")}
            {toastBtn("success")}
            {toastBtn("warning")}
            {toastBtn("error")}
            <Toast
                text="Example Toast"
                show={this.state.showToast}
                type={this.state.toastType}
                duration={5000}
                onClose={this.onCloseToast}
            />
        </View>;
    }
    onToggleToast = () => this.setState({ showToast: !this.state.showToast });
    onCloseToast = (action: boolean, timeout: boolean) => {
        console.log('onCloseToast', { action, timeout });
        this.setState({ showToast: false });
    };

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

export default reduxConnector(TempScreen);
