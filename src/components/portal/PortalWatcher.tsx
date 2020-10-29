import React, {ConsumerProps} from "react";
import {PortalNetworkManager} from "./PortalNetwork/PortalNetworkManager";
import {PortalNetworkContext} from "./PortalNetwork/PortalNetworkContext";
import {Subscription} from "rxjs";
import {PortalExit, PortalExitProps} from "./PortalExit";
import {PortalEntrance} from "./PortalEntrance";

export interface PortalWatcherData {
    exit: PortalExit|null;
    entrances: PortalEntrance[];
}

export interface PortalWatcherProps extends ConsumerProps<PortalWatcherData> {
    portalId: string;
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
        this.watch(this.props.portalId);
    }

    componentWillUnmount() {
        this.unwatch();
    }

    componentDidUpdate(prevProps: Readonly<PortalExitProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        if (prevProps.portalId !== this.props.portalId) {
            this.watch(this.props.portalId);
        }
    }

    watch(portalId: string) {
        this.unwatch();
        this.onLinkChange = this.manager.subscribeToLinkChanges(portalId, (data) => {
            this.setState({ data });
        });
    }

    unwatch() {
        this.onLinkChange?.unsubscribe();
    }

    render() {
        return this.props.children(this.state.data);
    }

}
