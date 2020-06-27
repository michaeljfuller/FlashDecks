import React, {createRef} from "react";
import {View} from "react-native";
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ModalRendererProps} from "./ModalRenderer.common";

const Stack = createStackNavigator();
const Context = React.createContext<ModalRendererProps|undefined>(undefined);

export class ModalRenderer extends React.Component<ModalRendererProps> {
    navigationRef = createRef<NavigationContainerRef>();

    render() {
        return <View style={{ flex: 1, flexDirection: 'column' }}>
            <Context.Provider value={this.props}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {this.renderNavigator()}
                </View>
            </Context.Provider>
        </View>;
    }

    componentDidUpdate(prevProps: Readonly<ModalRendererProps> /*, prevState: Readonly<{}>, snapshot?: any*/) {
        if (prevProps.modalKey !== this.props.modalKey) {
            this.navigationRef.current?.navigate(this.props.modalKey as string || NoModalKey);
        }
    }

    renderNavigator() {
        return <NavigationContainer ref={this.navigationRef}>
            <Stack.Navigator
                initialRouteName={NoModalKey}
                headerMode="none"
                mode="modal"
            >
                <Stack.Screen name={NoModalKey} component={BackgroundScreen}/>
                {
                    Object.keys(this.props.modals).map(key => {
                        return <Stack.Screen key={key} name={key} component={TemplateWrapperScreen}/>;
                    })
                }
            </Stack.Navigator>
        </NavigationContainer>;
    }
}
export default ModalRenderer;

/** Renders the background screen. */
function BackgroundScreen() {
    return <Context.Consumer>{props => props?.background}</Context.Consumer>
}
const NoModalKey = '__NoModalKey__';

/** A Screen that contains a modal template. */
function TemplateWrapperScreen() {
    return <Context.Consumer>{
        props => {
            const {
                modalKey = '',
                modals = {}
            } = props || {};
            const Template = modalKey && modals[modalKey];
            if (Template) {
                return <React.Fragment>
                    <Template
                        modalKey={modalKey}
                        payload={props?.payload}
                        close={props?.close || (() => {
                        })}
                    >{props?.contents}</Template>
                </React.Fragment>;
            }
            return null;
        }
    }</Context.Consumer>
}
