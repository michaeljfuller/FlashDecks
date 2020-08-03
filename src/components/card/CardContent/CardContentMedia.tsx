import React from "react";

import {CardContentModel} from "../../../models";
import {CardMediaError} from "./media/CardMediaError";
import {CardMediaImage} from "./media/CardMediaImage";
import {CardMediaLink} from "./media/CardMediaLink";
import {CardMediaText} from "./media/CardMediaText";
import {CardMediaVideo} from "./media/CardMediaVideo";

export interface CardContentMediaProps {
    content: CardContentModel;
    editing?: boolean;
    onChange?: (content: CardContentModel) => void;
    height?: number;
}

/** Wrapper to get the right media type for CardContent. */
export function CardContentMedia(props: CardContentMediaProps) {
    const {content, editing, onChange, height} = props;
    switch (content.type) {
        case "Image": return <CardMediaImage content={content} height={height} />;
        case "Link": return <CardMediaLink content={content} height={height} />;
        case "Text": return <CardMediaText content={content} height={height} editing={editing} onChange={onChange} />;
        case "Video": return <CardMediaVideo content={content} height={height} />;
    }
    return <CardMediaError message={`Unhandled content type "${content.type}".`} height={height} />;
}
export default CardContentMedia;
