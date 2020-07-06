import React from "react";
import {Text, View} from "react-native";
import {CardViewProps} from "./CardView.common";

export default function CardView(props: CardViewProps) {
    return <View style={[props.style, { borderWidth: 1, padding: 2 }]}>
        <Text>CardView</Text>
        <Text style={{ fontSize: 10 }}>{JSON.stringify(props.item, null, 2)}</Text>
    </View>;
}
