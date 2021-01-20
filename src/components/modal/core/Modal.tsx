import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialModal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import {ModalBase} from "./Modal.common";

export * from "./Modal.common";

export class Modal extends ModalBase {

    onClose = () => this.close();

    render() {
        const { width, height, style, children } = this.props;
        return <MaterialModal open={this.isOpen} onClose={this.onClose}>
            {
                this.isClosed
                ? <View />
                : <DialogContent>
                    <View style={styles.modalParent}>
                        <View style={styles.modalWrapper}>
                            <View style={[
                                styles.modalContents,
                                { width, height },
                                style
                            ]}>
                                {children}
                            </View>
                        </View>
                    </View>
                </DialogContent>
            }
        </MaterialModal>;
    }

}
export default Modal;

const shadowRadius = 4;
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
    modalContents: {
        // Size
        maxHeight: '100vh',
        maxWidth: '100vw',
        minWidth: '30vw',
        minHeight: '30vh',

        // Border
        borderRadius: 8,
        overflow: "hidden",

        // Shadow
        shadowRadius,
        shadowOpacity: 0.3,
        elevation: shadowRadius * 2,
        shadowOffset: { width: 0, height: shadowRadius }
    },
});
