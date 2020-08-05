import React from 'react';
import {Modal as NativeModal} from 'react-native';
import {ModalProps} from "./Modal.common";

export * from "./Modal.common";

export abstract class Modal<
    Props extends ModalProps = ModalProps,
    State = any
> extends React.Component<Props, State> {
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
