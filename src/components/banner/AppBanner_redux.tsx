import {connect} from 'react-redux';
import {StoreState} from "../../store/store";
import {UserModel} from "../../models";

// Extra properties for the screen
export interface AppBannerStoreProps {
    loggedInUser: UserModel|null;
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): AppBannerStoreProps {
    return {
        loggedInUser: state.loggedInUser.value
    };
}

export const reduxConnector = connect(mapStateToProps);
