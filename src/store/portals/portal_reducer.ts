import {ActionType} from '../store_actions';
import {createReducer, Draft} from "../reducerHelpers";
import {PortalEntranceAdd, PortalEntranceCallback, PortalEntranceRemove} from './portal_actions';

export interface PortalState {
    entrances: Record<string, PortalEntranceCallback[]>;
}

export const portal_reducer = createReducer<PortalState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.PORTAL_ENTRANCE_ADD: return addEntrance(draft, action as PortalEntranceAdd);
            case ActionType.PORTAL_ENTRANCE_REMOVE: return removeEntrance(draft, action as PortalEntranceRemove);
        }
    }, {
        entrances: {}
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

/** Equality doesn't work, since reducer uses Proxies. Instead, compare symbols of proxy and passed entrance. */
function indexOfEntranceProxy(entrance: PortalEntranceCallback, proxies: PortalEntranceCallback[]): number {
    return proxies.findIndex(proxy => proxy.symbol === entrance.symbol);
}
