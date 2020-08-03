import React from "react";
import {LinkButton} from "../../../button/LinkButton";
import {CardContentModel} from "../../../../models";

export interface CardMediaLinkProps {
    content: CardContentModel;
    height?: number;
}

export function CardMediaLink(props: CardMediaLinkProps) {
    return <LinkButton url={props.content.value} style={{ height: props.height }} />;
}
