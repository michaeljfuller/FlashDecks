import React from "react";
import {StyleSheet} from "react-native";
import {DefaultTheme, Color} from "../../../styles/UIColorTheme";

export const theme = DefaultTheme;

export const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.White,
        height: '100%'
    },
    titleView: {
        backgroundColor: theme.primary.base,
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
