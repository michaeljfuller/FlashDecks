import {connect} from 'react-redux';
import {StoreState, LoggedInUserState, DecksState} from "../../../store/store";

// Extra properties for the screen
export interface DeckViewScreenStoreProps {
    loggedInUser: LoggedInUserState['value']|null;
    decks: DecksState['collection'];
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DeckViewScreenStoreProps {
    return {
        loggedInUser: state.loggedInUser.value,
        decks: state.decks.collection,
    };
}

export const reduxConnector = connect(mapStateToProps);
