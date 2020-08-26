import {connect} from 'react-redux';
import {StoreState} from "../../store/store";

// Properties to add to navigator from store state
function mapStateToProps(state: StoreState) {
    return {
        navBlockers: state.navigation.blockers,
    };
}

export type NavigatorStoreProps = ReturnType<typeof mapStateToProps>;
export const navigatorReduxConnector = connect(mapStateToProps);
