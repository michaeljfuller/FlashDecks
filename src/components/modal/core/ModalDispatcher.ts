import React from "react";
import {ModalPayload, ModelContents} from "../createModals";
import ModalManager from "./ModalManager";

export interface ModelDispatcherProps<ModalKey extends string|number = string|number>{
    manager: ModalManager<ModalKey>;
    show: boolean;
    modelKey: ModalKey;
    payload?: ModalPayload;
    contents?: ModelContents;
}

export function ModelDispatcher<
    ModalKey extends string|number = string|number
>(props: ModelDispatcherProps<ModalKey>) {
    const {manager, modelKey, payload, show, contents} = props
    React.useEffect(() => {
        if (show) {
            manager.open(modelKey, payload, contents);
        } else {
            manager.close(modelKey);
        }
    });
    return null; // Children passed to dispatcher, so nothing to render here.
}
export default ModelDispatcher;
