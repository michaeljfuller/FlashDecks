import React from "react";
import {Text} from "react-native";
import {CardContentProps} from "../CardContent";

export function CardMediaVideo(props: CardContentProps) {
    return <React.Fragment>
        <Text selectable={false}>CardMediaVideo</Text>
        <Text selectable={false}>{props.content.value}</Text>
    </React.Fragment>;
}
