import React from "react";
import {BehaviorSubject} from "rxjs";
import {ModalSelectorState} from "./ModalSelector";
import {ModalContents} from "../createModals";

type Container<ModalKey extends string|number = string|number> = React.Component<any, ModalSelectorState<ModalKey>>

/** Object passed down to allow operations. */
export class ModalManager<ModalKey extends string|number = string|number> {
    constructor(readonly selector: Container<ModalKey>) {}

    get currentModal() {
        return this.selector.state.currentKey;
    }
    onChange = new BehaviorSubject(this.selector.state);

    setSelectorState(modalKey: ModalKey|undefined, payload: any|undefined, contents: ModalContents|undefined) {
        const state = {
            currentKey: modalKey,
            currentPayload: payload,
            currentContents: contents,
        } as ModalSelectorState<ModalKey>;

        this.selector.setState(state);
        this.onChange.next(state);
    }

    open(modalKey: ModalKey, payload?: any, contents?: ModalContents) {
        this.setSelectorState(modalKey, payload, contents);
    }

    close(modalKey?: ModalKey) {
        if (!modalKey || this.currentModal === modalKey) {
            this.setSelectorState(undefined, undefined, undefined);
        }
    }

    isOpen(modalKey?: string) {
        return modalKey === undefined ? this.currentModal !== undefined : this.currentModal === modalKey;
    }
}
export default ModalManager;
