import React from "react";
import {CardContentProps} from "../CardContent";
import {LinkButton} from "../../../button/LinkButton";

export function CardMediaLink(props: CardContentProps) {
    return <LinkButton url={props.content.value} />;
}
