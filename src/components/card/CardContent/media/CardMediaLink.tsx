import React from "react";
import {LinkButton} from "../../../button/LinkButton";
import {BaseCardMediaProps} from "./core/BaseCardMedia";

export type CardMediaLinkProps = BaseCardMediaProps;

export const CardMediaLink = React.memo(function CardMediaLink(props: CardMediaLinkProps) {
    let {height} = props;
    const {minHeight, maxHeight} = props;
    if (height !== undefined) {
        if (minHeight) height = Math.max(height, minHeight);
        if (maxHeight) height = Math.min(height, maxHeight);
    }
    return <LinkButton url={props.content.value} height={height} />;
});
export default CardMediaLink;
