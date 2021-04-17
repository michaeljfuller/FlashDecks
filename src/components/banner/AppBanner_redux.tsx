import {connect} from 'react-redux';
import {StoreState, LoggedInUserState} from "../../store/store";

// Extra properties for the screen
export interface AppBannerStoreProps {
    loggedInUser: LoggedInUserState['value'];
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): AppBannerStoreProps {
    return {
        loggedInUser: state.loggedInUser.value
    };
}

export const reduxConnector = connect(mapStateToProps);
