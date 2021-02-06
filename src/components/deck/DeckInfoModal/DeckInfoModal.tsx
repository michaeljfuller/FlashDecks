import React from "react";
import ImmutableComponent from "../../ImmutableComponent";
import Modal, {ModalProps, extractModalProps} from "../../modal/core/Modal";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi";
import ToastStore from "../../../store/toast/ToastStore";
import ApiRequest from "../../../api/util/ApiRequest";
import {DeckInfoModalEdit} from "./parts/DeckInfoModalEdit";
import {DeckInfoModalView} from "./parts/DeckInfoModalView";
import {Subscription} from "rxjs";

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
    pushInfoSub?: Subscription;

    componentWillUnmount() {
        this.toast.removeByRef();
        this.pushInfoSub?.unsubscribe();
    }

    protected async pushInfo(info: DeckInfo, deckId?: string): Promise<DeckModel> {
        this.pushInfoSub?.unsubscribe();
        const request = deckId ? deckApi.update({ input: {...info, id: deckId}}) : deckApi.create({ input: info });
        const {promise, subscription} = request.toPromiseAndSubscription();
        this.pushInfoSub = subscription;
        return await promise;
    }

    async save(info: DeckInfo) {
        if (info) {
            const deck = this.props.deck;

            this.setStateTo({ saving: true });
            this.toast.add({ text: `Saving "${info.title}"...`, canDismiss: false });

            try {
                const response = await this.pushInfo(info, deck.id);
                this.toast.add({ type: "success", text: `Saved "${response.title}".`, duration: 3000 });
                this.props.onChange && this.props.onChange(info);
                this.props.onClose && this.props.onClose();
            } catch (error) {
                this.toast.addError(error, `Failed to save "${info.title}".`, {ref: 'DeckInfoModal.save'});
            }
            this.toast.removeByRef();
            this.setStateTo({ saving: false });
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
