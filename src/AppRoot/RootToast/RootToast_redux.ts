import {connect} from 'react-redux';
import {StoreState} from "../../store/store";

// Properties to add to component from store state
function mapStateToProps(state: StoreState) {
    return {
        toast: state.toast.queue,
    };
}

export type RootToastStoreProps = ReturnType<typeof mapStateToProps>;
export const reduxConnector = connect(mapStateToProps);
