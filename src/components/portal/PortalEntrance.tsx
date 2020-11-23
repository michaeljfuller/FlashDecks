import React, {PropsWithChildren} from "react";
import {View, ViewProps} from "react-native";
import portalStore from "../../store/portals/PortalStore";
import {PortalEntranceStoreProps, reduxConnector} from "./PortalEntrance_redux";
import {SignedStoreObject, signObjectForStore} from "../../store/reducerHelpers";
import {instanceId} from "../../utils/instanceId";

type ViewWithStore = PortalEntranceStoreProps & PropsWithChildren<ViewProps>;
export interface PortalEntranceProps extends ViewWithStore {
    /** The ID linking this PortalEntrance to a PortalExit. */
    portalId: string;
    onOpen?: () => void;
    onClose?: () => void;
    name?: string;
}

/** A callback that creates the PortalEntrance's contents. */
export type PortalEntranceCallback = () => React.ReactElement;

/** The packet sent through the portal. */
export type PortalEntrancePacket = SignedStoreObject<{
    name: string;
    create: PortalEntranceCallback;
    close: UnconnectedPortalEntrance['onClose'];
}>

/**
 * A component whose contents will get sent to the PortalExit that has the same networkId PortalNetwork.
 */
export class UnconnectedPortalEntrance extends React.Component<PortalEntranceProps, any> {

    /** The element to be picked up by a PortalExit. */
    packet?: PortalEntrancePacket;
    previousPacket?: PortalEntrancePacket;

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
        this.unregisterWithManager(prevProps.portalId, this.previousPacket);
        this.registerWithManager();
        this.previousPacket = undefined;

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
        if (this.packet) {
            portalStore.addEntrance(this.props.portalId, this.packet);
            this.portalExitCount && this.onOpen();
        }
    }

    unregisterWithManager(
        portalId = this.props.portalId,
        packet: PortalEntrancePacket|undefined = this.packet
    ) {
        if (packet) portalStore.removeEntrance(portalId, packet);
    }

    /** Update the element to be picked up by the PortalExit, and return nothing to be rendered. */
    render() {
        this.previousPacket = this.packet;
        this.packet = signObjectForStore(
            {
                name: instanceId((this.props.name || '') + 'Portal'),
                create: () => <View {...this.viewProps}>{this.props.children}</View>,
                close: this.onClose.bind(this)
            },
            this.props.portalId
        );
        return null;
    }

}
export const PortalEntrance = reduxConnector(UnconnectedPortalEntrance as React.ComponentType<PortalEntranceProps>);
export type PortalEntrance = typeof PortalEntrance;
export default PortalEntrance;
