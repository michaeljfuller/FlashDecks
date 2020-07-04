import React, {createRef, FunctionComponent} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {ModalRendererProps} from "./ModalRenderer.common";
import {NavigationState} from "@react-navigation/routers";
export {ModalRendererProps} from "./ModalRenderer.common";

const Stack = createStackNavigator();
const Context = React.createContext<ModalRendererProps|undefined>(undefined);

export class ModalRenderer extends React.Component<ModalRendererProps> {
    navigationRef = createRef<NavigationContainerRef>();

    /** If the modal is closed via navigator, ensure close is triggered. */
    onStateChange = (state: NavigationState | undefined) => {
        if (state && state.type === 'stack') {
            const routeName = state.routes[state.index].name;
            if (routeName !== ModalOpenKey) {
                this.props.close();
            }
        }
    }

    /** If a modal is opened/closed, update the navigation. */
    componentDidUpdate(prevProps: Readonly<ModalRendererProps> /*, prevState: Readonly<{}>, snapshot?: any*/) {
        const wasOpen = Boolean(prevProps.modal);
        const isOpen = Boolean(this.props.modal);
        if (wasOpen !== isOpen) {
            this.navigationRef.current?.navigate(isOpen ? ModalOpenKey : ModalClosedKey);
        }
    }

    render() {
        return <View style={styles.navigationView}>
            <Context.Provider value={this.props}>
                <View style={styles.navigationView}>
                    <NavigationContainer
                        ref={this.navigationRef}
                        // onStateChange={this.onStateChange}
                    >
                        <Stack.Navigator
                            initialRouteName={ModalClosedKey}
                            headerMode="none"
                            mode="modal"
                        >
                            <Stack.Screen name={ModalOpenKey} component={ModalOpenScreen}/>
                            <Stack.Screen name={ModalClosedKey} component={ModalClosedScreen}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </Context.Provider>
        </View>;
    }
}
export default ModalRenderer;

function ModalOpenScreen() {
    return <View>
        <Context.Consumer>{
            props => {
                const { modal } = props || {};
                if (modal) {
                    const ModalWrapper: FunctionComponent = () => modal ? modal.renderModal() : null;
                    ModalWrapper.displayName = modal ? modal.constructor.name+'Wrapper' : 'ModalInstance';
                    return <ModalWrapper />;
                }
                return <View><Text>ModalOpenScreen: No modal found</Text></View>;
            }
        }</Context.Consumer>
    </View>;
}
const ModalOpenKey = 'ModalOpen';

function ModalClosedScreen() {
    return <Context.Consumer>{props => props?.background}</Context.Consumer>;
}
const ModalClosedKey = 'ModalClosed';

const styles = StyleSheet.create({
    navigationView: {
        flex: 1,
        flexDirection: 'column',
    },
});
