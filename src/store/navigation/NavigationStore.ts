import AStoreHelper from "../AStoreHelper";
import {ActionType} from "../store";
import {NavigationState} from "./navigation_reducer";
import {
    NavigationBlock,
    NavigationBlockPayload,
    NavigationBlockRef,
    NavigationUnblock
} from "./navigation_actions";

export class NavigationStore extends AStoreHelper<NavigationState> {

    constructor() {
        super('navigation');
    }

    block(payload: NavigationBlockPayload): void {
        const action: NavigationBlock = {type: ActionType.NAVIGATION_BLOCK, payload};
        this.store.dispatch(action);
    }

    unblock(ref: NavigationBlockRef): void {
        const action: NavigationUnblock = {type: ActionType.NAVIGATION_UNBLOCK, ref};
        this.store.dispatch(action);
    }

    has(ref: NavigationBlockRef): boolean {
        return this.state.blockers.findIndex(block => ref === block.ref ) >= 0;
    }

}
export const navigationStore = new NavigationStore;
export default navigationStore;
