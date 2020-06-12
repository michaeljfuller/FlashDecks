import {connect} from 'react-redux';
import {StoreState} from "../../../store/store";

// Extra properties for the screen
export interface DeckEditScreenStoreProps {
    loggedInUser: User|null;
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DeckEditScreenStoreProps {
    return {
        loggedInUser: state.loggedInUser.value
    };
}

export const reduxConnector = connect(mapStateToProps);
