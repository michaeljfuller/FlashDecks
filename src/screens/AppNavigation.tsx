import React from "react";
import {
    NavigationContainer,
    NavigationContainerRef,
    DrawerActions,
} from '@react-navigation/native';
import {Auth} from "aws-amplify";
import {AppRoutes, AppRoutesTree} from "./AppRouteTree";
import {
    createExtendableDrawerNavigator,
    ExtendableDrawerRender,
    ExtendableDrawerRouterDetails,
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
export interface AppNavigationState {
    routerDetails?: ExtendableDrawerRouterDetails;
}

/**
 * A component defining the root navigation for the app.
 */
export class AppNavigation extends React.Component<AppNavigationParams, AppNavigationState> {
    state = {} as AppNavigationState;

    renderContents: ExtendableDrawerRender = (contents, routerDetails) => {
        const toggleDrawer = () => routerDetails.navigation.dispatch(DrawerActions.toggleDrawer());
        const signOut = () => Auth.signOut().catch(e => console.warn('Error signing out', e)); // TODO Add toast

        return <React.Fragment>
            <AppBanner
                routerDetails={routerDetails}
                onToggleSidebar={toggleDrawer}
                onSignOutClick={signOut}
            />
            <InfoBanner />
            {contents}
        </React.Fragment>;
    };

    onRouterDetails = (routerDetails: ExtendableDrawerRouterDetails) => {
        this.setState({routerDetails});
    };

    /**
     * Create a screen that will be destroyed when navigating away.
     */
    createScreen(
        name: string,
        Component: React.FunctionComponent|typeof React.Component
    ) {
        const {state} = this.state.routerDetails || {};
        const {routes, index = 0} = state || {};
        const currentRoute = routes ? routes[index].name : '';
        const isCurrentRoute = currentRoute === name;
        return <Screen
            name={name}
            component={isCurrentRoute ? Component : () => null}
        />;
    }

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
                    onRouterDetails={this.onRouterDetails}
                >

                    <Screen name={AppRoutes.Home}  component={DashboardScreen} options={{icon: null} /* TODO Add icon to options */}/>
                    {this.createScreen(AppRoutes.Temp, TempScreen)}
                    {this.createScreen(AppRoutes.Decks, DeckRouteContainer)}

                </Navigator>
            </NavigationContainer>
        </React.Fragment>;
    }
}
export default AppNavigation;
