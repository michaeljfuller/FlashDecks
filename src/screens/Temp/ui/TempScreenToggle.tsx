import React from "react";
import {Button} from "../../../components/button/Button";

export interface TempScreenToggleProps {
    title: string;
    onClick: () => void;
    value: boolean;
}
export function TempScreenToggle(props: TempScreenToggleProps) {
    return <Button square
        title={props.title}
        onClick={props.onClick}
        color={props.value ? "Green" : "Red"}
    />
}
export default TempScreenToggle;
