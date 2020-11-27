import React from "react";
import {VideoPlayer} from "../../../video/VideoPlayer";
import {CardContentModel} from "../../../../models";

export interface CardMediaVideoProps {
    content: CardContentModel;
    height?: number;
}

export const CardMediaVideo = React.memo(function CardMediaVideo(props: CardMediaVideoProps) {
    return <VideoPlayer
        sourceUri={props.content.value}
        height={props.height}
        autoplay
        controls
        loop
        muted
    />;
});
