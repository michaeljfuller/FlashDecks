import {IAction, ActionType} from '../store_actions';
import {PortalEntranceCallback} from "../../components/portal/PortalEntrance";

export {PortalEntranceCallback} from "../../components/portal/PortalEntrance";

export interface PortalEntranceAdd extends IAction {
    type: ActionType.PORTAL_ENTRANCE_ADD;
    portalId: string;
    entrance: PortalEntranceCallback;
}

export interface PortalEntranceRemove extends IAction {
    type: ActionType.PORTAL_ENTRANCE_REMOVE;
    portalId: string;
    entrance: PortalEntranceCallback;
}
