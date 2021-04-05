import React from "react";
import Modal, {ModalProps, extractModalProps} from "../../modal/core/Modal";
import {CardModel} from "../../../models";
import ToastStore from "../../../store/toast/ToastStore";
import {CardInfoModalEdit} from "./parts/CardInfoModalEdit";
import {CardInfoModalView} from "./parts/CardInfoModalView";

export type EditCardModalProps = {
    card?: CardModel;
    editable?: boolean;
    onChange?: (card: CardInfo) => void;
    onCancel?: () => void;
} & ModalProps;

export interface CardInfo {
    title: CardModel['title'];
}

export class CardInfoModal extends React.PureComponent<EditCardModalProps> {
    toast = new ToastStore();
    modifiedCard?: CardModel;

    get card() {
        return this.modifiedCard || this.props.card || new CardModel;
    }
    get info(): CardInfo {
        return {
            title: this.card.title,
        };
    }

    componentDidUpdate(prevProps: Readonly<EditCardModalProps>/*, prevState: Readonly<any>, snapshot?: {}*/) {
        if (CardModel.different(prevProps.card, this.props.card)) {
            this.modifiedCard = undefined;
        }
    }
    componentWillUnmount() {
        this.toast.removeByRef();
    }

    apply(info: CardInfo) {
        this.props.onChange && this.props.onChange(info);
        this.close();
    }
    close() {
        this.modifiedCard = undefined;
        this.props.onClose();
    }

    onPressOK = (info: CardInfo) => this.apply(info);
    onPressCancel = () => {
        this.props.onCancel && this.props.onCancel();
        this.close();
    }

    onChangeTitle = (title: string) => {
        this.modifiedCard = this.card.update({ title });
    }

    render() {
        return <Modal {...extractModalProps(this.props)}>
            {
                this.props.editable
                ? <CardInfoModalEdit
                    title={this.props.card ? 'Edit Card' : 'Create Card'}
                    card={this.card}
                    onPressOK={this.onPressOK}
                    onPressCancel={this.onPressCancel}
                />
                : <CardInfoModalView card={this.card} onClose={this.props.onClose} />
            }
        </Modal>;
    }

}
