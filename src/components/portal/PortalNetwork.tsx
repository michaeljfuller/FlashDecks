import React from "react";
import {PortalNetworkManager} from "./PortalNetwork/PortalNetworkManager";
import {PortalNetworkContext} from "./PortalNetwork/PortalNetworkContext";

export {PortalNetworkManager} from "./PortalNetwork/PortalNetworkManager";
export {PortalNetworkContext} from "./PortalNetwork/PortalNetworkContext";

/***
 * A required top-level React Context Component which holds the PortalNetworkManager to manage state.
 */
export class PortalNetwork extends React.Component<any, any> {
    private manager = new PortalNetworkManager;

    render() {
        return <PortalNetworkContext.Provider value={this.manager}>
            {this.props.children}
        </PortalNetworkContext.Provider>;
    }
}
