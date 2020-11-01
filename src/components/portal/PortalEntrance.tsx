import React from "react";
import {View, ViewProps} from "react-native";
import portalStore from "../../store/portals/PortalStore";

export interface PortalEntranceProps extends ViewProps {
    /** The ID linking this PortalEntrance to a PortalExit. */
    portalId: string;
}

export interface PortalEntranceCallback {
    (): React.ReactElement;
    symbol: symbol; // Symbol used to match equality inside Redux, since it uses Proxies.
}

/** Attaches symbol to the callback. */
function createCallback(portalId: string, callback: () => React.ReactElement): PortalEntranceCallback {
    const result = callback as PortalEntranceCallback;
    result.symbol = Symbol(portalId);
    return result;
}

/**
 * A component whose contents will get sent to the PortalExit that has the same networkId PortalNetwork.
 */
export class PortalEntrance extends React.Component<PortalEntranceProps, any> {

    /** The element to be picked up by a PortalExit. */
    getElement?: PortalEntranceCallback;
    previousGetElement?: PortalEntranceCallback;

    get viewProps(): ViewProps {
        const {...viewProps} = this.props;
        delete viewProps.portalId;
        return viewProps;
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
    }

    registerWithManager(
        portalId = this.props.portalId,
        callback: PortalEntranceCallback|undefined = this.getElement
    ) {
        if (callback) portalStore.addEntrance(portalId, callback);
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
        this.getElement = createCallback(
            this.props.portalId,
            () => <View {...this.viewProps}>{this.props.children}</View>
        );
        return null;
    }

}
