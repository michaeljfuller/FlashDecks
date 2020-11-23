import {connect} from 'react-redux';
import {StoreState} from "../../store/store_manifest";

// Properties to add to screen from store state
function mapStateToProps(state: StoreState) {
    return {
        portalExitCounts: state.portal.exitCount,
    };
}

export type PortalEntranceStoreProps = ReturnType<typeof mapStateToProps>;
export const reduxConnector = connect(mapStateToProps);
