import React, {PropsWithChildren} from "react";
import {View, ViewProps} from "react-native";
import portalStore from "../../store/portals/PortalStore";
import {PortalExitStoreProps, reduxConnector} from "./PortalExit_redux";

type ViewWithStore = PortalExitStoreProps & PropsWithChildren<ViewProps>;
export interface PortalExitProps extends ViewWithStore {
    portalId: string;
    onEmpty?: () => void;
    onFilled?: () => void;
}

/***
 * A component which renders the contents of PortalEntrances with the same portalId in the PortalNetwork.
 */
export class UnconnectedPortalExit extends React.PureComponent<PortalExitProps> {

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

    componentDidMount() {
        this.registerWithManager();
    }
    componentWillUnmount() {
        this.unregisterWithManager();
    }
    componentDidUpdate(prevProps: Readonly<PortalExitProps>/*, prevState: Readonly<any>, snapshot?: any*/) {
        if (prevProps.portalId !== this.props.portalId) {
            this.unregisterWithManager(prevProps.portalId);
            this.registerWithManager();
        }
        const previousCount = prevProps.portals[prevProps.portalId]?.length || 0;
        const currentCount = this.props.portals[this.props.portalId]?.length || 0;
        if (previousCount && !currentCount) {
            this.props.onEmpty && this.props.onEmpty();
        }
        if (!previousCount && currentCount) {
            this.props.onFilled && this.props.onFilled();
        }
    }

    registerWithManager() {
        portalStore.addExit(this.props.portalId);
    }
    unregisterWithManager(portalId = this.props.portalId) {
        portalStore.removeExit(portalId);
    }

    // TODO Update only if entrance with same portalId has changed.
    // shouldComponentUpdate(nextProps: Readonly<PortalEntranceProps>, nextState: Readonly<any>, nextContext: any): boolean {}

    render() {
        return <View {...this.viewProps}>
            {this.entrance || this.props.children || null}
        </View>;
    }

}
export const PortalExit = reduxConnector(UnconnectedPortalExit as React.ComponentType<PortalExitProps>);
export type PortalExit = typeof PortalExit;
export default PortalExit;
