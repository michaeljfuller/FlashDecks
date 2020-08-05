import React from "react";
import ReactDOM from "react-dom";
import {PortalNetworkContext, PortalNetworkManager} from "./PortalNetwork";

export interface PortalEntranceProps {
    networkId?: string;
    render?: boolean;
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

    componentDidMount() {
        this.registerPortal();
    }

    componentWillUnmount() {
        this.unregisterPortal();
    }

    componentDidUpdate(prevProps: Readonly<PortalEntranceProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        const didRender = prevProps.render === undefined ? true : prevProps.render;
        const willRender = this.props.render === undefined ? true : this.props.render;
        if (!didRender && willRender) this.registerPortal();
        if (didRender && !willRender) this.unregisterPortal();
    }

    private registerPortal() {
        this.manager.addEntrance(this, this.props.networkId);
    }

    private unregisterPortal() {
        this.manager.removeEntrance(this, this.props.networkId);
    }

    render() {
        const id = this.props.networkId;
        const container = this.manager.getExit(id);
        if (container) {
            return ReactDOM.createPortal(
                this.props.children,
                container,
            );
        }
        console.warn(`Cannot render PortalEntrance because its PortalNetwork has no PortalExit with portalId ${id ? `"${id}"` : '[default]'}.`)
        return null;
    }

}
