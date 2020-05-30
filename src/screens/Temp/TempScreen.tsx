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

export enum TestIds {
    User='TempScreen_User',
    Env='TempScreen_Env'
}

export type TempScreenProps = NavigationScreenProps;

export class TempScreen extends Component<TempScreenProps & TempScreenStoreProps>
{
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
