import {connect} from 'react-redux';
import {StoreState, LoggedInUserState} from "../../store/store";

// Extra properties for the screen
export interface TempScreenStoreProps {
    loggedInUser: LoggedInUserState['value'];
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): TempScreenStoreProps {
    return {
        loggedInUser: state.loggedInUser.value
    };
}

export const reduxConnector = connect(mapStateToProps);
