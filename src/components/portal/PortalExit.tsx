import React from "react";
import {View, ViewProps} from "react-native";
import {PortalExitStoreProps, reduxConnector} from "./PortalExit_redux";

type ViewWithStore = PortalExitStoreProps & ViewProps;
export interface PortalExitProps extends ViewWithStore {
    portalId: string;
}

/***
 * A component which renders the contents of PortalEntrances with the same portalId in the PortalNetwork.
 */
export class PortalExitComponent extends React.Component<PortalExitProps> {

    /** The entrance this is linked to */
    get entrance() {
        const entrances = this.props.portals[this.props.portalId];
        const entrance = (entrances && entrances[0]) || null;
        return (entrance && entrance()) || null;
    }

    get viewProps(): ViewProps {
        const {...viewProps} = this.props;
        delete viewProps.portals;
        delete viewProps.portalId;
        return viewProps;
    }

    // TODO Update only if entrance with same portalId has changed.
    // shouldComponentUpdate(nextProps: Readonly<PortalEntranceProps>, nextState: Readonly<any>, nextContext: any): boolean {}

    render() {
        return <View {...this.viewProps}>
            {this.entrance}
        </View>;
    }

}
export const PortalExit = reduxConnector(PortalExitComponent as React.ComponentType<PortalExitProps>);
