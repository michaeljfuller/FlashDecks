import React from "react";
import {CardMediaError} from "./media/CardMediaError";
import {CardMediaImage} from "./media/CardMediaImage";
import {CardMediaLink} from "./media/CardMediaLink";
import {CardMediaText} from "./media/CardMediaText";
import {CardMediaVideo} from "./media/CardMediaVideo";

export interface CardContentProps {
    content: CardContent;
    parentHeight: number;
}

export function CardContentView(props: CardContentProps) {
    return getMedia(props);
}
export default CardContentView;

function getMedia(props: CardContentProps): JSX.Element {
    let height: undefined|number = undefined;
    if (props.content.size && props.parentHeight) {
        height = Math.floor(props.parentHeight * props.content.size) || undefined;
    }
    switch (props.content.type) {
        case "Image": return <CardMediaImage content={props.content} height={height} />;
        case "Link": return <CardMediaLink content={props.content} height={height} />;
        case "Text": return <CardMediaText content={props.content} height={height} />;
        case "Video": return <CardMediaVideo content={props.content} height={height} />;
    }
    return <CardMediaError message={`Unhandled content type "${props.content.type}".`} height={height} />;
}
