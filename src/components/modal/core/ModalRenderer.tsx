import React from "react";
import {ModalRendererProps} from "./ModalRenderer.common";

export function ModalRenderer(props: ModalRendererProps) {
    const Template = props.template;
    if (Template) {
        return <Template
            modalKey={props.modalKey}
            payload={props.payload}
            close={props.close}
        >{props.contents}</Template>;
    }
    return null;
}
export default ModalRenderer;
