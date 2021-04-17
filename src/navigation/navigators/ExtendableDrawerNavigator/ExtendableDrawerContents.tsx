import React from "react";
import {View} from "react-native";
import {DrawerContentComponentProps} from "@react-navigation/drawer/src/types";
import {withStyles} from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";
import {Color, DefaultTheme} from "../../../styles/UIColorTheme";
import {readableRoute} from "../../../routes";
import {navigatorReduxConnector, NavigatorStoreProps} from "../navigator_redux";

export function ExtendableDrawerContents(props: DrawerContentComponentProps) {
    const {
        state,       // The navigation state of the navigator, state.routes contains list of all routes
        navigation,  // The navigation object for the navigator.
    //  descriptors, // A descriptor object containing options for the drawer screens. The options can be accessed at descriptors[route.key].options.
    //  progress,    // Reanimated Node that represents the animated position of the drawer (0 is closed; 1 is open).
    } = props;

    return <View style={{ flex: 1, backgroundColor: Color.OffWhite }}>
        <ExtendableDrawerButtons navigation={navigation} state={state} />
    </View>;
}
export default ExtendableDrawerContents;

interface ExtendableDrawerButtonsProps {
    state: DrawerContentComponentProps['state'];
    navigation: DrawerContentComponentProps['navigation'];
}
const ExtendableDrawerButtons = navigatorReduxConnector(
    function ExtendableDrawerButtons(props: ExtendableDrawerButtonsProps){
        const { state, navigation, navBlockers } = props as DrawerContentComponentProps & NavigatorStoreProps;
        return <React.Fragment>{
            state.routes.map((route, index) => {
                // const descriptor = descriptors[route.key];

                const onClick = () => {
                    if (navBlockers.length) {
                        navBlockers.forEach(({attemptCallback, reason, ref}) => {
                            attemptCallback && attemptCallback(reason, ref);
                        });
                    } else {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return <DrawerButton
                    key={route.key}
                    onClick={onClick}
                    disabled={index === state.index}
                >{readableRoute(route.name)}</DrawerButton>;

            })
        }</React.Fragment>;
    }
);

const buttonColor = DefaultTheme;
const DrawerButton = withStyles({
    root: {
        borderRadius: 0,
        justifyContent: 'left',
        backgroundColor: buttonColor.primary.base,
        color: buttonColor.secondary.base,
        '&:hover': {
            backgroundColor: buttonColor.primary.hover,
            color: buttonColor.secondary.hover,
        },
        '&:disabled': {
            backgroundColor: buttonColor.primary.disabled,
            color: buttonColor.secondary.disabled,
        }
    },
    label: { textTransform: 'none' }
})(MaterialButton) as typeof MaterialButton;
