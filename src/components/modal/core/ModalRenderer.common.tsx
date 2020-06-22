import React from "react";
import {ModalComponent} from "../createModals";

export interface ModalRendererProps {
    Component?: ModalComponent;
    modalKey?: string|number;
    payload?: any;
    contents?: React.ReactChildren;
}
