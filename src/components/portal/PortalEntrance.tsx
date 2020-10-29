import React from "react";
import {View, ViewStyle} from "react-native";
import {PortalNetworkContext, PortalNetworkManager} from "./PortalNetwork";

export interface PortalEntranceProps {
    /** The ID linking this PortalEntrance to a PortalExit. */
    portalId: string;
    style?: ViewStyle;
}

/**
 * A component whose contents will get sent to the PortalExit that has the same networkId PortalNetwork.
 */
export class PortalEntrance extends React.Component<PortalEntranceProps, any> {

    // Bind ModalManager
    static contextType = PortalNetworkContext;
    get manager(): PortalNetworkManager {
        return this.context;
    }

    /** The element to be picked up by a PortalExit. */
    element: React.ReactElement|null = null;

    componentDidMount() {
        this.registerWithManager();
    }
    componentWillUnmount() {
        this.unregisterWithManager();
    }

    componentDidUpdate(prevProps: Readonly<PortalEntranceProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        // Change ID and/or force refresh on the PortalExit.
        this.unregisterWithManager(prevProps.portalId);
        this.registerWithManager();
    }

    registerWithManager(portalId = this.props.portalId) {
        this.manager.addEntrance(portalId, this);
    }
    unregisterWithManager(portalId = this.props.portalId) {
        this.manager.removeEntrance(portalId, this);
    }

    render() {
        // Update the element to be picked up by the PortalExit, and return nothing to be rendered here.
        this.element = <View style={this.props.style}>{this.props.children}</View>;
        return null;
    }

}
