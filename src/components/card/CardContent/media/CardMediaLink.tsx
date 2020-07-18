import React from "react";
import {LinkButton} from "../../../button/LinkButton";

export interface CardMediaLinkProps {
    content: CardContent;
    height?: number;
}

export function CardMediaLink(props: CardMediaLinkProps) {
    return <LinkButton url={props.content.value} style={{ height: props.height }} />;
}
