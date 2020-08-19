import React from "react";

import {CardContentModel} from "../../../models";
import {CardMediaError} from "./media/CardMediaError";
import {CardMediaImage} from "./media/CardMediaImage";
import {CardMediaLink} from "./media/CardMediaLink";
import {CardMediaText} from "./media/CardMediaText";
import {CardMediaVideo} from "./media/CardMediaVideo";

export interface CardContentMediaProps {
    content: CardContentModel;
    height?: number;
}

/** Wrapper to get the right media type for CardContent. */
export const CardContentMedia = React.memo(function CardContentMedia(props: CardContentMediaProps) {
    const {content, height} = props;
    switch (content.type) {
        case "Image": return <CardMediaImage content={content} height={height} />;
        case "Link": return <CardMediaLink content={content} height={height} />;
        case "Text": return <CardMediaText content={content} height={height} />;
        case "Video": return <CardMediaVideo content={content} height={height} />;
    }
    return <CardMediaError message={`Unhandled content type "${content.type}".`} height={height} />;
});
export default CardContentMedia;
