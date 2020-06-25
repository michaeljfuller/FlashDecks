import React from "react";
import {ModalTemplate, ModalContents} from "../createModals";

export interface ModalRendererProps {
    Component?: ModalTemplate;
    modalKey?: string|number;
    payload?: any;
    contents?: ModalContents;
}
