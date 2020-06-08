import {connect} from 'react-redux';
import {StoreState} from "../../../store/store";

// Extra properties for the screen
export interface DeckListScreenStoreProps {
    loggedInUser: User|null;
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DeckListScreenStoreProps {
    return {
        loggedInUser: state.loggedInUser.value
    };
}

export const reduxConnector = connect(mapStateToProps);
