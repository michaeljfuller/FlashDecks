import {connect} from 'react-redux';
import {StoreState} from "../../store/store_manifest";

// Properties to add to screen from store state
function mapStateToProps(state: StoreState) {
    return {
        portals: state.portal.entrances,
    };
}

export type PortalExitStoreProps = ReturnType<typeof mapStateToProps>;
export const reduxConnector = connect(mapStateToProps);
