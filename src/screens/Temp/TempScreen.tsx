import React, {Component, PropsWithChildren} from "react";
import {Text, View} from "react-native";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, TempScreenStoreProps} from "./TempScreen_redux";
import {envName} from "../../env";
import {Modals, ModalKeys} from "../../AppRoot/AppModals";

import {Button} from "../../components/button/Button";
import {TextButton} from "../../components/button/TextButton";
import {IconButton, IconType} from "../../components/button/IconButton";
import {repeat} from "../../utils/array";

export enum TestIds {
    User='TempScreen_User',
    Env='TempScreen_Env'
}

const TestContext = React.createContext('TestContext');

export type TempScreenProps = NavigationScreenProps;
interface TempScreenState {
    contextValue1: number;
    contextValue2: number;
    showModelFoo: boolean;
    showModelBar: boolean;
    showTestModal: boolean;
    showAlertModal: boolean;
}

export class TempScreen extends Component<TempScreenProps & TempScreenStoreProps, TempScreenState>
{
    state = {
        contextValue1: 1,
        contextValue2: 2,
        showModelFoo: false,
        showModelBar: false,
        showTestModal: false,
        showAlertModal: false,
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
                <Button title="Button" onClick={noop} />
                <TextButton title="TextButton" onClick={noop} color="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" text="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" flat />
                <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" transparent />
            </Row>
            <Row borderColor='red' backgroundColor='#fee'>
                <Button title="Button" onClick={noop} color="Red" flat={true} />
                <TextButton title="TextButton" onClick={noop} color="Red" />
                <IconButton icon={IconType.Home} onClick={noop} text="Red" color="Red" />
                <IconButton icon={IconType.Home} onClick={noop} text="Home" color="Red" transparent />
            </Row>
            <Row borderColor='green' backgroundColor='#efe'>
                <Button title="Button" onClick={noop} color="Green" />
                <TextButton title="TextButton" onClick={noop} color="Green" />
                <IconButton icon={IconType.Menu} onClick={noop} text="Green" color="Green" />
                <IconButton icon={IconType.Menu} onClick={noop} text="Menu" color="Green" transparent />
            </Row>
            <Row borderColor='grey' backgroundColor='#eee'>
                <Button title="Disabled Button" />
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

            <TextButton title={'showTestModal ' + this.state.showTestModal} onClick={() => this.setState({ showTestModal: !this.state.showTestModal })} />
            <Modals.Instance
                modelKey={ModalKeys.Test}
                show={this.state.showTestModal}
                onClose={() => this.setState({ showTestModal: false }) }
                payload={{
                    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13,
                    n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
                }}
            >
                <Text>Something</Text><Text>Something</Text><Text>Something</Text><Text>Something</Text>
                <Text>Something</Text><Text>Something</Text><Text>Something</Text><Text>Something</Text>
                <Text>Something</Text><Text>Something</Text><Text>Something</Text><Text>Something</Text>
            </Modals.Instance>

            <TextButton title={'showAlertModal ' + this.state.showAlertModal} onClick={() => this.setState({ showAlertModal: !this.state.showAlertModal })} />
            <Modals.Instance
                modelKey={ModalKeys.Alert}
                show={this.state.showAlertModal}
                onClose={() => this.setState({ showAlertModal: false }) }
                payload={{ title: 'foo', message: 'bar' }}
            >
                <Text>Something</Text>
            </Modals.Instance>

        </View>;
    }
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
