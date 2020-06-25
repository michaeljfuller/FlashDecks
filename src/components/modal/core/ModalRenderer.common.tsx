import React from "react";
import {ModalTemplate, ModalContents} from "../createModals";

export interface ModalRendererProps {
    template?: ModalTemplate;
    modalKey?: string|number;
    payload?: any;
    contents?: ModalContents;
    close: () => void;
}
