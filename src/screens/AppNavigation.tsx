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
import DashboardScreen from "./Dashboard/DashboardScreen";
import {TempScreen} from "./Temp/TempScreen";
import DeckRouteContainer from "./Deck/DeckRouteContainer";
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

                    <Screen name={AppRoutes.Home}  component={DashboardScreen} options={{icon: null} /* TODO Add icon to options */}/>
                    <Screen name={AppRoutes.Temp}  component={TempScreen}/>
                    <Screen name={AppRoutes.Decks} component={DeckRouteContainer}/>

                </Navigator>
            </NavigationContainer>
        </React.Fragment>;
    }
}
export default AppNavigation;
