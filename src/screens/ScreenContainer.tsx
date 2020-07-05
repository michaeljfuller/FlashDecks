import React, {PropsWithChildren} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {ScreenContainerProps} from "./ScreenContainer.common";
export * from "./ScreenContainer.common";

export default function ScreenContainer(props: PropsWithChildren<ScreenContainerProps>) {
    return <ScrollView
        style={styles.parent}
        contentContainerStyle={[ styles.child, props.style ]}
    >{props.children}</ScrollView>;
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    child: {
        height: '100%',
    },
});
