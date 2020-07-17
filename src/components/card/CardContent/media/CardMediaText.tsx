import React from "react";
import {Text} from "react-native";
import {CardContentProps} from "../CardContent";

export function CardMediaText(props: CardContentProps) {
    return <Text selectable={false}>{props.content.value}</Text>;
}
