import {connect} from 'react-redux';
import {StoreState} from "../../store/store";

// Extra properties for the screen
export interface DecksScreenStoreProps {
    loggedInUser: User|null;
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DecksScreenStoreProps {
    return {
        loggedInUser: state.loggedInUser.value
    };
}

export const reduxConnector = connect(mapStateToProps);
