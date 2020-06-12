import {connect} from 'react-redux';
import {StoreState} from "../../../store/store";

// Extra properties for the screen
export interface DeckViewScreenStoreProps {
    loggedInUser: User|null;
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DeckViewScreenStoreProps {
    return {
        loggedInUser: state.loggedInUser.value
    };
}

export const reduxConnector = connect(mapStateToProps);
