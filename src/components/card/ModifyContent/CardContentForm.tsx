import React from "react";
import {Text} from "react-native";
import {CardContentModel} from "../../../models";
import {CardFormText} from "./form/CardFormText";
import {CardFormImage} from "./form/CardFormImage";
import {CardFormVideo} from "./form/CardFormVideo";
import {CardFormLink} from "./form/CardFormLink";

interface CardContentResizerProps {
    content: CardContentModel;
    onChange: (content: CardContentModel) => void;
    preview?: boolean;
}

/** A form to edit the content. */
export const CardContentForm = React.memo(function CardContentForm(props: CardContentResizerProps) {
    switch (props.content.type) {
        case "Text":  return <CardFormText  content={props.content} onChange={props.onChange} />
        case "Image": return <CardFormImage content={props.content} onChange={props.onChange} preview={props.preview} />
        case "Video": return <CardFormVideo content={props.content} onChange={props.onChange} preview={props.preview} />
        case "Link":  return <CardFormLink  content={props.content} onChange={props.onChange} preview={props.preview} />
    }
    return <Text>Unsupported content type &quot;{props.content.type}&quot;.</Text>;
});
export default CardContentForm;
