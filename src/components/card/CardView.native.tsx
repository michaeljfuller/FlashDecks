import React from "react";
import {Text, View} from "react-native";
import CardViewBase from "./CardView.common";

export interface CardViewState {}
export default class CardView extends CardViewBase<CardViewState> {
    state: CardViewState = {};

    render() {
        return <View style={{ borderWidth: 1, padding: 2 }}>
            <Text>CardView</Text>
            <Text style={{ fontSize: 10 }}>{JSON.stringify(this.props.item, null, 2)}</Text>
        </View>;
    }
}
