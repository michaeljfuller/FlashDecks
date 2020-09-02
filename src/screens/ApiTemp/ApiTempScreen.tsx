import React from "react";
import {Text, View} from "react-native";
import ImmutablePureComponent from "../../components/ImmutablePureComponent";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, ApiTempScreenStoreProps} from "./ApiTempScreen_redux";

export type ApiTempScreenProps = NavigationScreenProps;
export type ApiTempScreenState = Readonly<{}>;

export class ApiTempScreen extends ImmutablePureComponent<
    ApiTempScreenProps & ApiTempScreenStoreProps,
    ApiTempScreenState
> {
    readonly state = {} as ApiTempScreenState;
    render() {
        return (
            <ScreenContainer style={{ paddingHorizontal: 10 }}>
                <View>
                    <Text>ApiTempScreen</Text>
                </View>
            </ScreenContainer>
        );
    }

}
export default reduxConnector(ApiTempScreen);
