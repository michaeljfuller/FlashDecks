import React from "react";
import {View, ViewStyle} from "react-native";
import {PortalNetworkContext} from "./PortalNetwork/PortalNetworkContext";
import {PortalNetworkManager} from "./PortalNetwork/PortalNetworkManager";

export interface PortalExitProps {
    portalId: string;
    style?: ViewStyle;
}

/***
 * A component which renders the contents of PortalEntrances with the same portalId in the PortalNetwork.
 */
export class PortalExit extends React.Component<PortalExitProps> {

    // Bind ModalManager
    static contextType = PortalNetworkContext;
    get manager(): PortalNetworkManager {
        return this.context;
    }

    /** The entrance this is linked to */
    get entrance() {
        return this.manager.getEntrances(this.props.portalId)[0] || null;
    }

    /** The subscription to link changes. */
    linkChangeSubscription?: ReturnType<PortalNetworkManager['subscribeToLinkChanges']>;

    componentDidMount() {
        this.registerWithManager(this.props.portalId);
    }

    componentWillUnmount() {
        this.unregisterWithManager(this.props.portalId);
    }

    componentDidUpdate(prevProps: Readonly<PortalExitProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        if (prevProps.portalId !== this.props.portalId) {
            this.unregisterWithManager(prevProps.portalId);
            this.registerWithManager(this.props.portalId);
        }
    }

    registerWithManager(portalId: string) {
        this.manager.addExit(portalId, this);
        this.linkChangeSubscription = this.manager.subscribeToLinkChanges(this.props.portalId, () => {
            this.forceUpdate(); // If the link changes, force a rerender.
        });
    }

    unregisterWithManager(portalId: string) {
        this.manager.removeExit(portalId, this);
        this.linkChangeSubscription?.unsubscribe();
        this.linkChangeSubscription = undefined;
    }

    render() {
        return <View style={this.props.style}>
            {this.entrance?.element || null}
        </View>;
    }

}
