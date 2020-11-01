import AStoreHelper from "../AStoreHelper";
import {ActionType} from "../store";
import {PortalState} from "./portal_reducer";
import {PortalEntranceAdd, PortalEntranceCallback, PortalEntranceRemove} from "./portal_actions";

/**
 * The PortalStore stores callbacks that create a PortalEntrance.
 * PortalEntrances are stored against a `portalId`, that a PortalExit with a matching `portalId` can grab the first element of.
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

}
export const portalStore = new PortalStore;
export default portalStore;
