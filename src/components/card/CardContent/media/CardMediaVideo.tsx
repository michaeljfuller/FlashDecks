import React from "react";
import {VideoPlayer} from "../../../video/VideoPlayer";
import {CardContentModel} from "../../../../models";

export interface CardMediaVideoProps {
    content: CardContentModel;
}

export const CardMediaVideo = React.memo(function CardMediaVideo(props: CardMediaVideoProps) {
    return <VideoPlayer
        sourceUri={props.content.value}
        autoplay
        controls
        loop
        muted
    />;
});
