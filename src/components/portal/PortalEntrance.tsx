import React, {PropsWithChildren} from "react";
import {View, ViewProps} from "react-native";
import portalStore from "../../store/portals/PortalStore";
import {PortalEntranceStoreProps, reduxConnector} from "./PortalEntrance_redux";
import {SignedStoreObject, signObjectForStore} from "../../store/reducerHelpers";

type ViewWithStore = PortalEntranceStoreProps & PropsWithChildren<ViewProps>;
export interface PortalEntranceProps extends ViewWithStore {
    /** The ID linking this PortalEntrance to a PortalExit. */
    portalId: string;
    onOpen?: () => void;
    onClose?: () => void;
}

/** A callback that creates a PortalEntrance. */
export type PortalEntranceCallback = SignedStoreObject<
    () => React.ReactElement
>;

/**
 * A component whose contents will get sent to the PortalExit that has the same networkId PortalNetwork.
 */
export class UnconnectedPortalEntrance extends React.Component<PortalEntranceProps, any> {

    /** The element to be picked up by a PortalExit. */
    getElement?: PortalEntranceCallback;
    previousGetElement?: PortalEntranceCallback;

    get viewProps(): ViewProps {
        const {...viewProps} = this.props;
        delete viewProps.portalId;
        return viewProps;
    }

    get portalExitCount() {
        return this.props.portalExitCounts[this.props.portalId] || 0;
    }

    componentDidMount() {
        this.registerWithManager();
    }
    componentWillUnmount() {
        this.unregisterWithManager();
    }

    componentDidUpdate(prevProps: Readonly<PortalEntranceProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        // Change ID and/or force refresh on the PortalExit.
        this.unregisterWithManager(prevProps.portalId, this.previousGetElement);
        this.registerWithManager();
        this.previousGetElement = undefined;

        // Open/close, depending on portal count.
        const previousExitCount = prevProps.portalExitCounts[prevProps.portalId] || 0;
        if (this.portalExitCount !== previousExitCount) {
            this.portalExitCount > 0 ? this.onOpen() : this.onClose();
        }
    }

    onOpen() {
        this.props.onOpen && this.props.onOpen();
    }
    onClose() {
        this.props.onClose && this.props.onClose();
    }

    registerWithManager() {
        if (this.getElement) {
            portalStore.addEntrance(this.props.portalId, this.getElement);
            this.portalExitCount && this.onOpen();
        }
    }

    unregisterWithManager(
        portalId = this.props.portalId,
        callback: PortalEntranceCallback|undefined = this.getElement
    ) {
        if (callback) portalStore.removeEntrance(portalId, callback);
    }

    /** Update the element to be picked up by the PortalExit, and return nothing to be rendered. */
    render() {
        this.previousGetElement = this.getElement;
        this.getElement = signObjectForStore(
            () => <View {...this.viewProps}>{this.props.children}</View>,
            this.props.portalId
        );
        return null;
    }

}
export const PortalEntrance = reduxConnector(UnconnectedPortalEntrance as React.ComponentType<PortalEntranceProps>);
export type PortalEntrance = typeof PortalEntrance;
export default PortalEntrance;
