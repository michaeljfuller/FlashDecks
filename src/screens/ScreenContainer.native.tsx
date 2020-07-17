import React, {PropsWithChildren} from "react";
import {StyleSheet} from "react-native";
import {Content} from "native-base";
import {ScreenContainerProps} from "./ScreenContainer.common";
export * from "./ScreenContainer.common";

export default function ScreenContainer(props: PropsWithChildren<ScreenContainerProps>) {
    return <Content
        style={styles.parent}
        contentContainerStyle={[ styles.child, props.style ]}
    >{props.children}</Content>;
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    child: {
        height: '100%',
    },
});
