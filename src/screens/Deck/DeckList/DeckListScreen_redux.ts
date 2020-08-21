import {connect} from 'react-redux';
import {StoreState, LoggedInUserState} from "../../../store/store";

// Extra properties for the screen
export interface DeckListScreenStoreProps {
    loggedInUser: LoggedInUserState['value'];
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DeckListScreenStoreProps {
    console.log('DeckListScreen_redux.mapStateToProps', state);
    return {
        loggedInUser: state.loggedInUser.value,
    };
}

export const reduxConnector = connect(mapStateToProps);
