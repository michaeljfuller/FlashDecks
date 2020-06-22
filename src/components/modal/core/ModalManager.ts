import React from "react";
import {ModalPayload, ModelContents} from "../createModals";

interface ModalManagerState<ModalKey extends string|number> {
    currentKey?: ModalKey;
    currentPayload?: ModalPayload;
    currentContents?: ModelContents;
}

/** Object passed down to allow operations. */
export class ModalManager<ModalKey extends string|number = string|number> {
    constructor(
        readonly container: React.Component<any, ModalManagerState<ModalKey>>,
    ) {}
    get currentModal() {
        return this.container.state.currentKey;
    }
    open(modalKey: ModalKey, payload?: ModalPayload, contents?: ModelContents) {
        this.close();
        this.container.setState({
            currentKey: modalKey,
            currentPayload: payload,
            currentContents: contents,
        });
    }
    close(modalKey?: ModalKey) {
        if (!modalKey || this.container.state.currentKey === modalKey) {
            this.container.setState({
                currentKey: undefined,
                currentPayload: undefined,
                currentContents: undefined,
            });
        }
    }
    isOpen(modalKey?: string) {
        return modalKey === undefined ? this.currentModal !== undefined : this.currentModal === modalKey;
    }
}
export default ModalManager;
