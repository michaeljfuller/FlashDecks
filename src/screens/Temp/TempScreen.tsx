import React, {Component, PropsWithChildren} from "react";
import {Text, View} from "react-native";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, TempScreenStoreProps} from "./TempScreen_redux";
import {envName} from "../../env";

import {Button} from "../../components/button/Button";
import {TextButton} from "../../components/button/TextButton";
import {IconButton, IconType} from "../../components/button/IconButton";
import {repeat} from "../../utils/array";
import createModals, {ModalProps} from "../../components/modal/createModals";

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
}

const TempModals = createModals({
    Foo: function FooModel({children, ...others}: ModalProps) {
        return <View style={{ borderWidth: 2, borderColor: 'red' }}>
            <Text style={{ color: 'red' }}>FooModel - {JSON.stringify(others)}</Text>
            {children}
        </View>;
    },
    Bar: function BarModel(props: ModalProps<{ text: string }>) {
        return <View style={{ borderWidth: 2, borderColor: 'orange' }}>
            <Text style={{ color: 'orange' }}>BarModel - {props.payload?.text}</Text>
            <Button onClick={props.close} title="Close" />
        </View>;
    },
});

export class TempScreen extends Component<TempScreenProps & TempScreenStoreProps, TempScreenState>
{
    state = {
        contextValue1: 1,
        contextValue2: 2,
        showModelFoo: false,
        showModelBar: false,
    } as TempScreenState;

    render() {
        const {loggedInUser} = this.props;
        const noop = () => {};
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                <Text testID={TestIds.User}>User: {loggedInUser && loggedInUser.displayName || '?'}</Text>
                <Text testID={TestIds.Env}>Environment: &quot;{envName}&quot;</Text>

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

                <View style={{ borderWidth: 2, margin: 2, padding: 2 }}>
                    <TempModals.Group>
                        <Text style={{ fontWeight: 'bold' }}>TempModals.Group</Text>
                        <TempModals.Watcher>{({modalKey, payload}) => <Text>TempModals.Watcher: {modalKey || 'none'} {JSON.stringify(payload)}</Text> }</TempModals.Watcher>
                        <Button title={'showModelFoo ' + this.state.showModelFoo} onClick={() => this.setState({ showModelFoo: !this.state.showModelFoo })} />
                        <Button title={'showModelBar ' + this.state.showModelBar} onClick={() => this.setState({ showModelBar: !this.state.showModelBar })} />
                        <TempModals.Modal
                            modelKey='Foo'
                            show={this.state.showModelFoo}
                            onClose={() => { this.setState({ showModelFoo: false }); console.log('Closed Foo'); }}
                            onOpen={() => console.log('Opened Foo')}
                        >
                            <Text>Child Of ModelFoo</Text>
                        </TempModals.Modal>
                        <TempModals.Modal
                            modelKey='Bar'
                            show={this.state.showModelBar}
                            payload={{ text: 'Hello' }}
                            onClose={() => { this.setState({ showModelBar: false }); console.log('Closed Bar'); }}
                            onOpen={() => console.log('Opened Bar')}
                        />
                    </TempModals.Group>
                </View>

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

                {repeat(30, index => {
                    return <Text key={index} style={{ fontSize: 50, textAlign: 'center', color: '#79F' }}>{index+1}</Text>
                })}


            </ScreenContainer>
        );
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
        marginHorizontal = 20,
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
