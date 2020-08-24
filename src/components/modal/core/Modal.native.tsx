import React from 'react';
import {Modal as NativeModal} from 'react-native';
import {ModalProps} from "./Modal.common";
import ImmutableComponent from "../../ImmutableComponent";

export * from "./Modal.common";

export abstract class Modal<
    Props extends ModalProps = ModalProps,
    State = any
> extends ImmutableComponent<Props, State> {
    state = {} as State;

    render() {
        return <NativeModal
            animationType="none"
            visible={this.props.open}
            onRequestClose={this.props.onClose}
            onShow={this.props.onOpen}
        >
            {this.renderModal()}
        </NativeModal>;
    }

    abstract renderModal(): React.ReactElement;

}
export default Modal;
