import React, {useState} from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import {CardViewProps} from "./CardView.common";
import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";

export default function CardView(props: CardViewProps) {
    const [sideIndex, setSideIndex] = useState(0);
    const sides = props.item?.sides || [];
    const side = sides[sideIndex];
    const onPress = () => setSideIndex((sideIndex + 1) % sides.length);

    return <View style={[styles.root, props.style]}>
        <Text style={styles.title}>CardView</Text>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.body} persistentScrollbar={true}>
            <CardSide side={side} style={styles.side} onPress={onPress} />
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
    scrollView: {
        borderColor: Color.Grey,
        backgroundColor: Color.White,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: "column",
    },
    body: {
        flex: 1,
    },
    side: {
        height: '100%',
    },
});
