import React from "react";
import {StyleSheet, Text, View} from "react-native";

export interface TempScreenSubsectionProps {
    title: string;
}
export function TempScreenSubsection(props: React.PropsWithChildren<TempScreenSubsectionProps>) {
    return <View>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.view}>
            {props.children}
        </View>
    </View>;
}
export default TempScreenSubsection;

const styles = StyleSheet.create({
    view: {
        borderWidth: 1,
        padding: 2,
        flexDirection: "column",
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        lineHeight: 45,
        fontSize: 25,
    }
})
