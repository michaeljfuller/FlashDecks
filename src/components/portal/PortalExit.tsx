import React from "react";
import {PortalNetworkContext} from "./PortalNetwork/PortalNetworkContext";
import {PortalNetworkManager} from "./PortalNetwork/PortalNetworkManager";

export interface PortalExitProps {
    networkId?: string;
}

/***
 * A component which renders the contents of PortalEntrances with the same networkId PortalNetwork.
 */
export class PortalExit extends React.Component<PortalExitProps> {

    // Bind ModalManager
    static contextType = PortalNetworkContext;
    get manager(): PortalNetworkManager {
        return this.context;
    }

    private containerRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        this.registerWithManager(this.props.networkId);
    }

    componentWillUnmount() {
        this.deregisterWithManager(this.props.networkId);
    }

    componentDidUpdate(prevProps: Readonly<PortalExitProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        if (prevProps.networkId !== this.props.networkId) {
            this.deregisterWithManager(prevProps.networkId);
            this.registerWithManager(this.props.networkId);
        }
    }

    registerWithManager(networkId: string|undefined) {
        this.manager.addExit(this.containerRef.current, networkId);
    }

    deregisterWithManager(networkId: string|undefined) {
        this.manager.removeExit(this.containerRef.current, networkId);
    }

    render() {
        return <div ref={this.containerRef}/>;
    }

}
