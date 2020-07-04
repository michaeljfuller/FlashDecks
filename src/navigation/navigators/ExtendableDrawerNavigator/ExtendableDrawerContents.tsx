import React from "react";
import {View} from "react-native";
import {DrawerContentComponentProps} from "@react-navigation/drawer/src/types";
import {withStyles} from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";
import {Color, DefaultTheme} from "../../../styles/UIColorTheme";
import {readableRoute} from "../../../routes";

export function ExtendableDrawerContents(props: DrawerContentComponentProps) {
    const {
        state,       // The navigation state of the navigator, state.routes contains list of all routes
        navigation,  // The navigation object for the navigator.
    //  descriptors, // A descriptor object containing options for the drawer screens. The options can be accessed at descriptors[route.key].options.
    //  progress,    // Reanimated Node that represents the animated position of the drawer (0 is closed; 1 is open).
    } = props;

    return <View style={{ flex: 1, backgroundColor: Color.OffWhite }}>
        {state.routes.map((route, index) => {
            // const descriptor = descriptors[route.key];
            return <DrawerButton
                key={route.key}
                onClick={() => navigation.navigate(route.name, route.params)}
                disabled={index === state.index}
            >{readableRoute(route.name)}</DrawerButton>;
        })}
    </View>;
}
export default ExtendableDrawerContents;

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
