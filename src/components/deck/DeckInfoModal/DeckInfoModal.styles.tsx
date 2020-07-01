import React from "react";
import {StyleSheet} from "react-native";
import {DefaultTheme, Color} from "../../../styles/UIColorTheme";

export const theme = DefaultTheme;

export const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.White,
        maxHeight: '100vh',
        maxWidth: '100vw',
        minWidth: '30vw',
        minHeight: '30vh',
    },
    titleView: {
        backgroundColor: theme.primary.base,
    },
    userView: {
        flexDirection: 'row',
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.secondary.base,
    },
    contents: {
        padding: 2
    },
});
export default styles;
