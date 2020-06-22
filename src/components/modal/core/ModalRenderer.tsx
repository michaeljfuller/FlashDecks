import React from "react";
import {ModalRendererProps} from "./ModalRenderer.common";

export function ModalRenderer(props: ModalRendererProps) {
    const {Component, modalKey, payload, contents} = props;
    if (Component) {
        return <Component modalKey={modalKey} payload={payload}>{contents}</Component>;
    }
    return null;

}
export default ModalRenderer;
