import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialModal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import {ModalRendererProps} from "./ModalRenderer.common";
export {ModalRendererProps} from "./ModalRenderer.common";

export function ModalRenderer(props: ModalRendererProps) {
    const {modal, background, close} = props;
    let modalElement = null;
    if (modal) {
        modalElement = <MaterialModal
            open={true}
            onClose={close}
        >
            <DialogContent>
                <View style={styles.modalParent}>
                    <View style={styles.modalWrapper}>
                        {modal.renderModal()}
                    </View>
                </View>
            </DialogContent>
        </MaterialModal>
    }

    return <React.Fragment>
        {background}
        {modalElement}
    </React.Fragment>;
}
export default ModalRenderer;

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
