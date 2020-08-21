import {connect} from 'react-redux';
import {DecksState, LoggedInUserState, StoreState} from "../../../store/store";

// Extra properties for the screen
export interface DeckEditScreenStoreProps {
    loggedInUser: LoggedInUserState['value']|null;
    decks: DecksState['collection'];
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DeckEditScreenStoreProps {
    return {
        loggedInUser: state.loggedInUser.value,
        decks: state.decks.collection,
    };
}

export const reduxConnector = connect(mapStateToProps);
