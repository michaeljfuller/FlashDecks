import React from "react";
import {StyleSheet, Text, View} from "react-native";

export interface TempScreenSubsectionProps {
    title: string;
    description?: string;
}
export function TempScreenSubsection(props: React.PropsWithChildren<TempScreenSubsectionProps>) {
    return <View>
        <Text style={styles.title}>{props.title}</Text>
        { props.description ? <Text style={styles.description}>{props.description}</Text> : null }
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
        marginVertical: 5,
        fontSize: 25,
    },
    description: {
        textAlign: "center",
        marginBottom: 5,
    },
});
