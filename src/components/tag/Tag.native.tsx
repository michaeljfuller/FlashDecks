import React from "react";
import {Badge, Text} from 'native-base';
import {DefaultTheme} from "../../styles/UIColorTheme";
import {TagProps} from "./Tag.common";

const theme = DefaultTheme;

export default function Tag(props: TagProps) {
    return <Badge style={{
        backgroundColor: theme.primary.base,
        margin: 1
    }}>
        <Text style={{ color: theme.secondary.base }}>{props.value}</Text>
    </Badge>;
}
