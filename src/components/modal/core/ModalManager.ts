import React from "react";
import {BehaviorSubject} from "rxjs";
import {isEqual} from "underscore";
import {ModalSelectorState} from "./ModalSelector";
import {ModalContents} from "../createModals";

type Container<ModalKey extends string|number = string|number> = React.Component<any, ModalSelectorState<ModalKey>>;

export interface ModalManagerStatus<ModalKey extends string|number = string|number> {
    modalKey?: ModalKey;
    payload?: any;
    contents?: ModalContents;
}
export interface ModalManagerStatusHistory<ModalKey extends string|number = string|number> {
    current: ModalManagerStatus<ModalKey>;
    previous?: ModalManagerStatus<ModalKey>;
}

function transformState<ModalKey extends string|number = string|number>(selectorState: ModalSelectorState<ModalKey>) {
    return {
        modalKey: selectorState.currentKey,
        payload: selectorState.currentPayload,
        contents: selectorState.currentContents,
    } as ModalManagerStatus<ModalKey>;
}

/** Object passed down to allow operations. */
export class ModalManager<ModalKey extends string|number = string|number> {
    constructor(readonly selector: Container<ModalKey>) {}

    get currentModal() {
        return this.selector.state.currentKey;
    }
    onChange = new BehaviorSubject<ModalManagerStatusHistory>({
        current: transformState(this.selector.state)
    });

    setSelectorState(currentKey: ModalKey|undefined, currentPayload: any|undefined, currentContents: ModalContents|undefined) {
        const previous = this.selector.state;
        const current = {
            currentKey,
            currentPayload,
            currentContents,
        } as ModalSelectorState<ModalKey>;

        if (!isEqual(current, previous)) {
            this.selector.setState(current);
            this.onChange.next({
                previous: transformState(previous),
                current: transformState(current),
            });
        }
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
