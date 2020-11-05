import React from 'react';
import {modalPortalId, ModalProps} from "./Modal.common";
import ImmutableComponent from "../../ImmutableComponent";
import {PortalEntrance} from "../../portal/PortalEntrance";
import {navigateToModal, navigateFromModal} from "../../../navigation/AppNavigation/RootNavigation/actions";

export * from "./Modal.common";

/**
 * Contents are passed into a PortalEntrance, which then get displayed in the PortalExit in a ModalsScreen.
 * When the `open` property is changed, `navigateToModal`/`navigateFromModal` trigger a navigation action on the `RootNavigation` component, which will either show the `ModalsScreen` or the standard `ScreenNavigation` component (where normal pages are displayed).
 */
export abstract class Modal<
    Props extends ModalProps = ModalProps,
    State = any
> extends ImmutableComponent<Props, State> {
    state = {} as State;

    componentDidMount() {
        if (this.props.open) {
            this.onOpen();
        }
    }

    componentWillUnmount() {
        if (this.props.open) {
            this.onClose();
        }
    }

    onOpen = () => {
        navigateToModal();
        this.props.onOpen && this.props.onOpen();
    }
    onClose = () => {
        navigateFromModal();
        this.props.onClose && this.props.onClose();
    }

    componentDidUpdate(prevProps: Readonly<Props>/*, prevState: Readonly<State>, snapshot?: {}*/) {
        if (prevProps.open !== this.props.open) {
            if (this.props.open) {
                this.onOpen();
            } else {
                this.onClose();
            }
        }
    }

    render() {
        if (!this.props.open) return null;
        return <PortalEntrance portalId={modalPortalId} onOpen={this.onOpen} onClose={this.onClose}>
            {this.renderModal()}
        </PortalEntrance>;
    }

    abstract renderModal(): React.ReactElement;

}
export default Modal;
