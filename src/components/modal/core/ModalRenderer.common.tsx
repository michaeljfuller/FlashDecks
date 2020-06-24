import React from "react";
import {ModalComponent, ModalContents} from "../createModals";

export interface ModalRendererProps {
    Component?: ModalComponent;
    modalKey?: string|number;
    payload?: any;
    contents?: ModalContents;
}
