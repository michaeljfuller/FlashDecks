import {connect} from 'react-redux';
import {StoreState} from "../../../store/store_manifest";

// Properties to add to navigator from store state
function mapStateToProps(state: StoreState) {
    return {
        navBlockers: state.navigation.blockers,
    };
}

export type AppBreadcrumbsStoreProps = ReturnType<typeof mapStateToProps>;
export const reduxConnector = connect(mapStateToProps);
