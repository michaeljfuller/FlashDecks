import {connect} from 'react-redux';
import {StoreState} from "../../../store/store";

// Properties to add to screen from store state
function mapStateToProps(state: StoreState) {
    return {
        loggedInUser: state.loggedInUser.value,
        decks: state.decks.collection,
    };
}

export type DeckEditScreenStoreProps = ReturnType<typeof mapStateToProps>;
export const reduxConnector = connect(mapStateToProps);
