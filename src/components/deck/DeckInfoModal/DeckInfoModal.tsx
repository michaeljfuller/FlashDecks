import React from "react";
import ImmutableComponent from "../../ImmutableComponent";
import Modal, {ModalProps, extractModalProps} from "../../modal/core/Modal";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi";
import ToastStore from "../../../store/toast/ToastStore";
import ApiRequest from "../../../api/util/ApiRequest";
import {DeckInfoModalEdit} from "./parts/DeckInfoModalEdit";
import {DeckInfoModalView} from "./parts/DeckInfoModalView";

export type DeckInfoModalProps = {
    deck: DeckModel;
    editable?: boolean;
    onChange?: (info: DeckInfo) => void;
    onCancel?: () => void;
} & ModalProps;

export interface DeckInfo {
    title: DeckModel['title'];
    description: DeckModel['description'];
    tags: DeckModel['tags'];
}

export interface DeckInfoModalState {
    saving: boolean;
}

/**
 * A simple modal with a close button.
 */
export class DeckInfoModal extends ImmutableComponent<DeckInfoModalProps, DeckInfoModalState> {
    state = { saving: false } as DeckInfoModalState;

    toast = new ToastStore(this);
    saveRequest?: ApiRequest<DeckModel>;

    componentWillUnmount() {
        this.toast.removeByRef();
        this.saveRequest?.drop();
    }

    async save(info: DeckInfo) {
        if (info) {
            const deck = this.props.deck;

            this.setStateTo({ saving: true });
            this.toast.add({ text: `Saving "${info.title}"...`, canDismiss: false });

            const request = deck.id ? deckApi.update({ input: {...info, id: deck.id}}) : deckApi.create({ input: info });
            const response = await request.wait(false);
            this.toast.removeByRef();

            if (response.error) {
                this.toast.addError(response.error, `Failed to save "${info.title}".`, {ref: 'DeckInfoModal.save'});
            } else {
                this.toast.add({ type: "success", text: `Saved "${info.title}".`, duration: 3000 });
            }

            if (!response.dropped) {
                this.setStateTo({ saving: false });
                if (!response.error) {
                    this.props.onChange && this.props.onChange(info);
                    this.props.onClose && this.props.onClose();
                }
            }
        } else {
            this.toast.add({ type: "warning", text: "No changes to save.", duration: 3000 });
        }
    }

    onPressSave = (info: DeckInfo) => this.save(info);
    onPressCancel = () => {
        this.props.onCancel && this.props.onCancel();
        this.props.onClose && this.props.onClose();
    }

    render() {
        const currentDeck = this.props.deck;
        return <Modal {...extractModalProps(this.props)}>
            {
                this.props.editable
                ? <DeckInfoModalEdit
                    deck={currentDeck}
                    disabled={this.state.saving}
                    onPressSave={this.onPressSave}
                    onPressCancel={this.onPressCancel}
                />
                : <DeckInfoModalView
                    deck={currentDeck}
                    onClose={this.props.onClose}
                />
            }
        </Modal>;
    }

}
