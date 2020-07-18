import React from "react";
import {View} from "react-native";
import {CardMediaVideoProps} from "./CardMediaVideo.common";

export function CardMediaVideo(props: CardMediaVideoProps) {
    return <View>
        <video autoPlay loop muted controls height={props.height}>
            <source src={props.content.value} type={"video/"+props.content.value.split('.').pop()} />
        </video>
    </View>;
}

