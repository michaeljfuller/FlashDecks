import React from "react";
import {ModalTemplate, ModalContents, ModalTemplateMap} from "../createModals";

export interface ModalRendererProps {
    modals: ModalTemplateMap;
    modalKey?: string|number;
    payload?: any;
    contents?: ModalContents;
    background: React.ReactNode;
    close: () => void;
}
