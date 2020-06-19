import React from "react";
import {TextStyle, View} from "react-native";
import {DrawerContentComponentProps} from "@react-navigation/drawer/src/types";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';
import {Color, DefaultTheme} from "../../../styles/UIColorTheme";

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
            const disabled = index === state.index;
            return <NativeBaseButton
                key={route.key}
                onPress={() => navigation.navigate(route.name, route.params)}
                disabled={disabled}
                style={disabled ? disabledBackgroundStyle : backgroundStyle}
                full
            >
                <NativeBaseText
                    style={disabled ? disabledTextStyle : textStyle}
                >{route.name}</NativeBaseText>
            </NativeBaseButton>;
        })}
    </View>;
}
export default ExtendableDrawerContents;

const buttonColor = DefaultTheme;

const backgroundStyle: RnViewStyleProp = {
    backgroundColor: buttonColor.primary.base,
};
const disabledBackgroundStyle: RnViewStyleProp = Object.assign({}, backgroundStyle, {
    backgroundColor: buttonColor.primary.disabled,
} as RnViewStyleProp);

const textStyle: TextStyle = {
    color: buttonColor.secondary.base,
    textTransform: 'none'
};
const disabledTextStyle: TextStyle = Object.assign({}, textStyle, {
    color: buttonColor.secondary.disabled
} as TextStyle);
