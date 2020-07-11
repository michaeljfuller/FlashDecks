import React from "react";
import {Text} from "react-native";
import {CardContentProps} from "../CardContent";

export function CardMediaText(props: CardContentProps) {
    return <React.Fragment>
        <Text selectable={false}>CardMediaText</Text>
        <Text selectable={false}>{props.content.value}</Text>
    </React.Fragment>;
}
