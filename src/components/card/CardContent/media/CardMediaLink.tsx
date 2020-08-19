import React from "react";
import {LinkButton} from "../../../button/LinkButton";
import {CardContentModel} from "../../../../models";

export interface CardMediaLinkProps {
    content: CardContentModel;
    height?: number;
}

export const CardMediaLink = React.memo(function CardMediaLink(props: CardMediaLinkProps) {
    return <LinkButton url={props.content.value} height={props.height} />;
});
export default CardMediaLink;
