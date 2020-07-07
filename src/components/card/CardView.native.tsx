import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {CardViewProps} from "./CardView.common";
import {Color} from "../../styles/Color";

export default function CardView(props: CardViewProps) {
    return <View style={[styles.root, props.style]}>
        <Text style={styles.title}>CardView</Text>
        <Text style={{ fontSize: 10 }}>{JSON.stringify(props.item, null, 2)}</Text>
    </View>;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.White,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 25,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 20,
    }
});
