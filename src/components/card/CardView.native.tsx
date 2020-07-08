import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import {CardViewProps} from "./CardView.common";
import {Color} from "../../styles/Color";

export default function CardView(props: CardViewProps) {
    return <View style={[styles.root, props.style]}>
        <Text style={styles.title}>CardView</Text>
        <ScrollView style={styles.body} persistentScrollbar={true}>
            <Text style={{ fontSize: 10 }}>{JSON.stringify(props.item, null, 2)}</Text>
        </ScrollView>
    </View>;
}

const edgeRadius = 15;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.OffWhite,
        paddingVertical: edgeRadius,
        borderRadius: edgeRadius,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 20,
    },
    body: {
        borderColor: Color.Grey,
        backgroundColor: Color.White,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
});
