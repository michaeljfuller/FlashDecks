import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialModal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import {ModalProps, ModalBase} from "./Modal.common";

export * from "./Modal.common";

export abstract class Modal<
    Props extends ModalProps = ModalProps,
    State = any
> extends ModalBase<Props, State> {

    onClose = () => this.close();

    render() { // TODO onOpen?
        return <MaterialModal
            open={this.isOpen}
            onClose={this.onClose}
        >
            { this.isOpen ? this.renderContent() : <View /> }
        </MaterialModal>;
    }

    renderContent() {
        return <DialogContent>
            <View style={styles.modalParent}>
                <View style={styles.modalWrapper}>
                    { this.renderModal() }
                </View>
            </View>
        </DialogContent>;
    }

}
export default Modal;

const styles = StyleSheet.create({
    modalParent: {
        // Span top left of screen to bottom right
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex', // Vertical center its child
    },
    modalWrapper: {
        margin: 'auto', // Horizontal center its child
        minWidth: 10,
        minHeight: 10,
    },
});
