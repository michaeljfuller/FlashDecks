import React, {PropsWithChildren} from "react";
import {View, ViewProps} from "react-native";
import {renameClass} from "../../utils/class";
import portalStore from "../../store/portals/PortalStore";
import {PortalEntrancePacket} from "./PortalEntrance";
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
@renameClass('PortalExit')
export class UnconnectedPortalExit extends React.PureComponent<PortalExitProps> {

    /** The entrances this is linked to */
    get entrances(): PortalEntrancePacket[] {
        return this.props.portals[this.props.portalId] || [];
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
            {this.entrances.map((entrance, index) => {
                // Keep all entrances alive, but only show the top.
                return <View key={entrance.name} style={{ display: index === 0 ? undefined : 'none' }}>
                    {entrance.create()}
                </View>;
            })}
        </View>;
    }

}
export const PortalExit = reduxConnector(UnconnectedPortalExit as React.ComponentType<PortalExitProps>);
export type PortalExit = typeof PortalExit;
export default PortalExit;
