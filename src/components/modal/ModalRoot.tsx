import React from 'react';
import {Subscription} from "rxjs";
import ModalManager from "./core/ModalManager";
import ModalRenderer from "./core/ModalRenderer";
import Modal from "./core/Modal";

/**
 * Create a Context for Modals to pick up the ModalManager.
 * No default value is needed, Provider sets a new one when it's created.
 */
export const ModalContext = React.createContext<ModalManager>(null as any);

export interface ModalRootProps {}
export interface ModalRootState {
    /** The current modal */
    modal: Modal|null;
}
export class ModalRoot extends React.Component<ModalRootProps, ModalRootState> {
    manager = new ModalManager();
    state = { modal: null } as ModalRootState;

    /** Holds unsubscribe */
    subscriptionOnChange: Subscription|null = null;

    /** Subscribe to manager. */
    componentDidMount() {
        this.subscribeToManager();
    }

    componentDidUpdate(/*prevProps: Readonly<ModalRootProps>, prevState: Readonly<ModalRootState>, snapshot?: any*/) {
        this.subscribeToManager();
    }

    /** Close modal and unsubscribe from ModalManager .*/
    componentWillUnmount() {
        if (this.subscriptionOnChange) {
            this.subscriptionOnChange.unsubscribe();
        }
    }

    /** Triggers state updates. */
    subscribeToManager() {
        if (!this.subscriptionOnChange && this.manager) {
            this.subscriptionOnChange = this.manager.onChange.subscribe({
                next: state => {
                    if (state.current.modal !== state.previous?.modal) {
                        this.setState({ modal: state.current.modal });
                    }
                },
            });
        }
    }

    /** Closes a modal */
    close = () => this.manager.close();

    render() {
        return <ModalContext.Provider value={this.manager}>
            <ModalRenderer
                modal={this.state.modal}
                background={this.props.children}
                close={this.close}
            />
        </ModalContext.Provider>;
    }
}
export default ModalRoot;
