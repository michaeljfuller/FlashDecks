import {connect} from 'react-redux';
import {StoreState, DecksState, LoggedInUserState} from "../../../store/store";

// Extra properties for the screen
export interface DeckListScreenStoreProps {
    loggedInUser: LoggedInUserState['value'];
    decks: DecksState['collection'];
}

// Properties to add to screen from store state
function mapStateToProps(state: StoreState): DeckListScreenStoreProps {
    console.log('DeckListScreen_redux.mapStateToProps', state);
    return {
        loggedInUser: state.loggedInUser.value,
        decks: state.decks.collection,
    };
}

export const reduxConnector = connect(mapStateToProps);
