import React from "react";
import {Text} from "react-native";
import {CardContentProps} from "../CardContent";

export function CardMediaLink(props: CardContentProps) {
    return <React.Fragment>
        <Text selectable={false}>CardMediaLink</Text>
        <Text selectable={false}>{props.content.value}</Text>
    </React.Fragment>;
}
