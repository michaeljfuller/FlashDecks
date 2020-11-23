import React from 'react';
import {StyleSheet, View} from "react-native";
import {ModalBase, ModalProps, modalPortalId} from "./Modal.common";
import {PortalEntrance} from "../../portal/PortalEntrance";
import {navigateToModal} from "../../../navigation/AppNavigation/RootNavigation/actions";

export * from "./Modal.common";

/**
 * Contents are passed into a PortalEntrance, which then get displayed in the PortalExit in a ModalsScreen.
 * When the `open` property is changed, `navigateToModal`/`navigateFromModal` trigger a navigation action on the `RootNavigation` component, which will either show the `ModalsScreen` or the standard `ScreenNavigation` component (where normal pages are displayed).
 */
export class Modal extends ModalBase {

    componentDidMount() {
        if (this.isOpen) {
            this.open();
        }
    }

    componentDidUpdate(prevProps: Readonly<ModalProps>/*, prevState: Readonly<State>, snapshot?: {}*/) {
        if (prevProps.open !== this.props.open) {     // If changed
            this.isOpen ? this.open() : this.close(); // Trigger callbacks
        }
    }

    componentWillUnmount() {
        if (this.isOpen) {
            this.close();
        }
    }

    open() {
        navigateToModal();
        super.open();
    }

    onOpen = () => this.open();
    onClose = () => this.close();

    render() {
        if (this.isClosed) return null;
        return <PortalEntrance
            portalId={modalPortalId}
            name={this.constructor.name}
            onOpen={this.onOpen}
            onClose={this.onClose}
        >
            <View style={[styles.modalContents, this.props.style]}>
                {this.props.children}
            </View>
        </PortalEntrance>;
    }

}
export default Modal;

export const styles = StyleSheet.create({
    modalContents: {
        height: '100%',
    },
});
