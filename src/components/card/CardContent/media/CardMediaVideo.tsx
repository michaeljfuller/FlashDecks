import React from "react";
import {View} from "react-native";
import {CardContentProps} from "../CardContent";

export function CardMediaVideo(props: CardContentProps) {
    return <View>
        <video
            autoPlay
            loop
            muted
            controls
        >
            <source src={props.content.value} type={"video/"+props.content.value.split('.').pop()} />
        </video>
    </View>;
}

