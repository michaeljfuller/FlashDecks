import React from "react";

import {CardContentModel} from "../../../models";
import {CardMediaError} from "./media/CardMediaError";
import {CardMediaImage} from "./media/CardMediaImage";
import {CardMediaLink} from "./media/CardMediaLink";
import {CardMediaText} from "./media/CardMediaText";
import {CardMediaVideo} from "./media/CardMediaVideo";
import {BaseCardMediaProps} from "./media/core/BaseCardMedia";

export type CardContentMediaProps = BaseCardMediaProps;

/** Wrapper to get the right media type for CardContent. */
export const CardContentMedia = React.memo(function CardContentMedia(props: CardContentMediaProps) {
    const {content, height} = props;
    switch (content.type) {
        case "Image": return <CardMediaImage {...props} />;
        case "Link": return <CardMediaLink {...props} />;
        case "Text": return <CardMediaText {...props} />;
        case "Video": return <CardMediaVideo {...props} />;
    }
    return <CardMediaError message={`Unhandled content type "${content.type}".`} height={height} />;
});
export default CardContentMedia;
