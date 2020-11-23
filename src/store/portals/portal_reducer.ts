import {ActionType} from '../store_actions';
import {compareSignedObjectForStore, createReducer, Draft} from "../reducerHelpers";
import {
    PortalEntrancePacket,
    PortalEntranceAdd,
    PortalEntranceRemove,
    PortalExitAdd,
    PortalExitRemove,
} from './portal_actions';

export interface PortalState {
    entrances: Record<string, PortalEntrancePacket[]>;
    exitCount: Record<string, number>;
}

export const portal_reducer = createReducer<PortalState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.PORTAL_ENTRANCE_ADD: return addEntrance(draft, action as PortalEntranceAdd);
            case ActionType.PORTAL_ENTRANCE_REMOVE: return removeEntrance(draft, action as PortalEntranceRemove);
            case ActionType.PORTAL_EXIT_ADD: return addExit(draft, action as PortalExitAdd);
            case ActionType.PORTAL_EXIT_REMOVE: return removeExit(draft, action as PortalExitRemove);
        }
    }, {
        entrances: {},
        exitCount: {},
    }
);

/** Add PortalEntranceCallback to array with the same `portalId`. */
function addEntrance(draft: Draft<PortalState>, action: PortalEntranceAdd) {
    const portalId = action.portalId;
    const entrances = draft.entrances[portalId] || [];
    const index = indexOfEntranceProxy(action.entrance, entrances);
    if (index < 0) {
        entrances.push(action.entrance);
    }
    draft.entrances[portalId] = entrances;
}

/** Remove PortalEntranceCallback to array with the same `portalId`. */
function removeEntrance(draft: Draft<PortalState>, action: PortalEntranceRemove) {
    const portalId = action.portalId;
    const entrances = draft.entrances[portalId] || [];
    const index = indexOfEntranceProxy(action.entrance, entrances);
    if (index >= 0) {
        entrances.splice(index, 1);
    }
}

/** Increment count for the `portalId`. */
function addExit(draft: Draft<PortalState>, action: PortalExitAdd) {
    const portalId = action.portalId;
    const exits = draft.exitCount[portalId] || 0;
    draft.exitCount[portalId] = exits + 1;
}

/** Decrement count for the `portalId`. */
function removeExit(draft: Draft<PortalState>, action: PortalExitRemove) {
    const portalId = action.portalId;
    const exits = draft.exitCount[portalId] || 0;
    draft.exitCount[portalId] = Math.max(0, exits - 1);
}

/** Equality doesn't work, since reducer uses Proxies. Instead, compare symbols of proxy and passed entrance. */
function indexOfEntranceProxy(entrance: PortalEntrancePacket, proxies: PortalEntrancePacket[]): number {
    return proxies.findIndex(proxy => compareSignedObjectForStore(proxy, entrance));
}
