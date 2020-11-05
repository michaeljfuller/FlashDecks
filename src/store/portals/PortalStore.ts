import AStoreHelper from "../AStoreHelper";
import {ActionType} from "../store";
import {PortalState} from "./portal_reducer";
import {PortalEntranceCallback, PortalEntranceAdd, PortalEntranceRemove, PortalExitAdd, PortalExitRemove} from "./portal_actions";

/**
 * The PortalStore stores callbacks that create a PortalEntrance.
 * PortalEntrances are stored against a `portalId`, that a PortalExit with a matching `portalId` can grab.
 */
export class PortalStore extends AStoreHelper<PortalState> {
    constructor() {
        super('portal');
    }

    /** Add PortalEntranceCallback to array with the same `portalId`. */
    addEntrance(portalId: string, entrance: PortalEntranceCallback): void {
        const action: PortalEntranceAdd = { type: ActionType.PORTAL_ENTRANCE_ADD, portalId, entrance };
        this.store.dispatch(action);
    }

    /** Remove PortalEntranceCallback to array with the same `portalId`. */
    removeEntrance(portalId: string, entrance: PortalEntranceCallback): void {
        const action: PortalEntranceRemove = { type: ActionType.PORTAL_ENTRANCE_REMOVE, portalId, entrance };
        this.store.dispatch(action);
    }

    /** Get PortalEntranceCallbacks stored against a `portalId`. */
    getEntrances(portalId: string): PortalEntranceCallback[] {
        return this.state.entrances[portalId] || [];
    }

    /** Increment count for the `portalId`. */
    addExit(portalId: string): void {
        const action: PortalExitAdd = { type: ActionType.PORTAL_EXIT_ADD, portalId };
        this.store.dispatch(action);
    }

    /** Decrement count for the `portalId`. */
    removeExit(portalId: string): void {
        const action: PortalExitRemove = { type: ActionType.PORTAL_EXIT_REMOVE, portalId };
        this.store.dispatch(action);
    }

    /** Get the number of registered exits for portalId. */
    getExitCount(portalId: string): number {
        return this.state.exitCount[portalId] || 0;
    }

}
export const portalStore = new PortalStore;
export default portalStore;
