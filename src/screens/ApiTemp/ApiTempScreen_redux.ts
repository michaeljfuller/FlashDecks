import {connect} from 'react-redux';
import {StoreState} from "../../store/store";

// Properties to add to screen from store state
function mapStateToProps(state: StoreState) {
    return {
        loggedInUser: state.loggedInUser.value,
        navBlocked: state.navigation.blockers.length > 0,
    };
}

export type ApiTempScreenStoreProps = ReturnType<typeof mapStateToProps>;
export const reduxConnector = connect(mapStateToProps);
