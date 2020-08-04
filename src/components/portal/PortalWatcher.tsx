import React, {Component, ConsumerProps} from "react";
import {PortalNetworkManager} from "./PortalNetwork/PortalNetworkManager";
import {PortalNetworkContext} from "./PortalNetwork/PortalNetworkContext";
import {Subscription} from "rxjs";
import {PortalExitProps} from "./PortalExit";

export interface PortalWatcherData {
    exit: HTMLDivElement|null;
    entrances: Component[];
}

export interface PortalWatcherProps extends ConsumerProps<PortalWatcherData> {
    networkId?: string;
}

export interface PortalWatcherState {
    data: PortalWatcherData;
}

/***
 * A utility class which sends PortalNetworkManager data to the child function.
 */
export class PortalWatcher extends React.Component<PortalWatcherProps, PortalWatcherState> {
    state = {
        data: {
            exit: null,
            entrances: [],
        }
    } as PortalWatcherState;

    // Bind ModalManager
    static contextType = PortalNetworkContext;
    get manager(): PortalNetworkManager {
        return this.context;
    }

    /** Holds unsubscribe */
    onLinkChange: Subscription|null = null;

    componentDidMount() {
        this.watch(this.props.networkId);
    }

    componentWillUnmount() {
        this.unwatch();
    }

    componentDidUpdate(prevProps: Readonly<PortalExitProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        if (prevProps.networkId !== this.props.networkId) {
            this.watch(this.props.networkId);
        }
    }

    watch(networkId: string|undefined) {
        this.unwatch();
        this.onLinkChange = this.manager.subscribeToLinkChanges((data) => {
            this.setState({ data });
        }, networkId);
    }

    unwatch() {
        this.onLinkChange?.unsubscribe();
    }

    render() {
        return this.props.children(this.state.data);
    }

}
