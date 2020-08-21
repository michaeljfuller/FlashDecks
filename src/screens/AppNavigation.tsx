import React from "react";
import * as Linking from 'expo-linking';
import {BackHandler, NativeEventSubscription} from "react-native";
import {NavigationContainer, NavigationContainerRef, DrawerActions, LinkingOptions} from '@react-navigation/native';
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
import AuthApi from "../api/AuthApi";
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
    auth = new AuthApi();

    /**
     * https://reactnavigation.org/docs/deep-linking/
     * https://docs.expo.io/workflow/linking/
     */
    linking = {
        prefixes: [
            Linking.makeUrl('/')
        ],
    } as LinkingOptions;

    hardwareBackPress?: NativeEventSubscription;
    componentDidMount() {
        this.auth = new AuthApi();
        this.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        if (this.hardwareBackPress) this.hardwareBackPress.remove();
    }

    /**
     * On back press (while no other back options), open the drawer.
     * https://reactnavigation.org/docs/custom-android-back-button-handling/
     */
    onBackPress = () => {
        if (appNavigation.current) {
            appNavigation.current.dispatch(DrawerActions.toggleDrawer());
            return true; // Block default behavior
        }
        return false; // Use default behavior
    }

    renderContents: ExtendableDrawerRender = (contents, routerDetails) => {
        const toggleDrawer = () => routerDetails.navigation.dispatch(DrawerActions.toggleDrawer());
        const signOut = () => this.auth.signOut().catch(e => console.warn('Error signing out', e)); // TODO Add toast

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
            <NavigationContainer ref={appNavigation} linking={this.linking}>
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
