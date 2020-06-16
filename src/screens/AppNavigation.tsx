import React from "react";
import {Text, View, Button} from "react-native";
import {
    NavigationContainer,
    NavigationContainerRef,
    DrawerActions,
} from '@react-navigation/native';
import {Auth} from "aws-amplify";
import {AppRoutes, AppRoutesTree} from "./AppRouteTree";
import {
    createExtendableDrawerNavigator,
    ExtendableDrawerRender
} from "../navigation/navigators/ExtendableDrawerNavigator/ExtendableDrawerNavigator";
import AppBanner from "../components/banner/AppBanner";
import InfoBanner from "../components/banner/InfoBanner";
const {Navigator, Screen} = createExtendableDrawerNavigator();

export const appNavigation = React.createRef<NavigationContainerRef>();
export const toggleDrawer = () => appNavigation.current?.dispatch(DrawerActions.toggleDrawer());
export const openDrawer   = () => appNavigation.current?.dispatch(DrawerActions.openDrawer());
export const closeDrawer  = () => appNavigation.current?.dispatch(DrawerActions.closeDrawer());
export const getRootState = () => appNavigation.current?.getRootState();

export interface AppNavigationParams {
    title?: string;
}
export interface AppNavigationState {}

/**
 * A component defining the root navigation for the app.
 */
export class AppNavigation extends React.Component<any, AppNavigationState> {

    renderContents: ExtendableDrawerRender = (contents, routerDetails) => {
        const toggleDrawer = () => routerDetails.navigation.dispatch(DrawerActions.toggleDrawer());
        const signOut = () => Auth.signOut().catch(e => console.warn('Error signing out', e)); // TODO Add toast

        return <React.Fragment> {/* TODO Use React context for navigation settings? */}
            <AppBanner
                routerDetails={routerDetails}
                onToggleSidebar={toggleDrawer}
                onSignOutClick={signOut}
            />
            <InfoBanner />
            {contents}
        </React.Fragment>;
    };

    render() {
        return <React.Fragment>
            <NavigationContainer ref={appNavigation}>
                <Navigator
                    initialRouteName={AppRoutesTree.base}
                    screenOptions={({route}) => {
                        const params: AppNavigationParams = route.params || {};
                        return {
                            title: params.title || route.name
                        };
                    }}
                    render={this.renderContents}
                >
                    <Screen name={AppRoutes.Home}  component={createScreen(AppRoutes.Home, this)} options={{title: 'Overview'}}/>
                    <Screen name={AppRoutes.Temp}  component={createScreen(AppRoutes.Temp, this)}/>
                    <Screen name={AppRoutes.Decks} component={createScreen(AppRoutes.Decks, this)}/>
                </Navigator>
            </NavigationContainer>
        </React.Fragment>;
    }
}
export default AppNavigation;

function createScreen(name: string, parent: AppNavigation) {
    return function TestScreenComponent(props: any){
        console.log(name, props, props.navigation.dangerouslyGetState());
        const rand = (digits = 4) => Math.floor(
            Math.random() * Math.pow(10, digits)
        ).toString().padStart(digits, '0');

        return <View>
            <Text style={{ fontWeight: 'bold' }}>AppNavigator {name}</Text>
            <Text>{JSON.stringify(props, null, 4)}</Text>

            <Button title="Navigate home"  onPress={() => props.navigation.navigate('Home', {cameFrom: name})} disabled={name === 'Home'} />
            <Button title="Go back"        onPress={() => props.navigation.goBack()} disabled={!props.navigation.canGoBack()} />
            <Button title="Change title"   onPress={() => props.navigation.setOptions({ title: props.route.name+': '+rand() })} />
            <Button title="Log Navigation" onPress={() => console.log('navigation', appNavigation.current)} />
            <Button title="Log State"      onPress={() => console.log('state', parent.state)} />
        </View>;
    }
}

