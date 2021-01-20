import React, {PropsWithChildren} from "react";
import {ViewStyle} from "react-native";
import Column from "../components/layout/Column";

export interface ScreenContainerProps {
    style?: ViewStyle;
    scroll?: boolean;
}

export default function ScreenContainer(props: PropsWithChildren<ScreenContainerProps>) {
    const {scroll=true} = props;
    return <Column flex scroll={scroll} style={props.style}>
        {props.children}
    </Column>;
}
