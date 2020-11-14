import React from 'react';
import {ModalBase, modalPortalId, ModalProps} from "./Modal.common";
import {PortalEntrance} from "../../portal/PortalEntrance";
import {navigateToModal} from "../../../navigation/AppNavigation/RootNavigation/actions";

export * from "./Modal.common";

/**
 * Contents are passed into a PortalEntrance, which then get displayed in the PortalExit in a ModalsScreen.
 * When the `open` property is changed, `navigateToModal`/`navigateFromModal` trigger a navigation action on the `RootNavigation` component, which will either show the `ModalsScreen` or the standard `ScreenNavigation` component (where normal pages are displayed).
 */
export abstract class Modal<
    Props extends ModalProps = ModalProps,
    State = any
> extends ModalBase<Props, State> {

    componentDidMount() {
        if (this.isOpen) {
            this.open();
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
            {this.renderModal()}
        </PortalEntrance>;
    }

    abstract renderModal(): React.ReactElement;

}
export default Modal;
