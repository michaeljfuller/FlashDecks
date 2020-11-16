import {IAction, ActionType} from '../store_actions';
import {PortalEntrancePacket} from "../../components/portal/PortalEntrance";

export {PortalEntrancePacket} from "../../components/portal/PortalEntrance";

export interface PortalEntranceAdd extends IAction {
    type: ActionType.PORTAL_ENTRANCE_ADD;
    portalId: string;
    entrance: PortalEntrancePacket;
}

export interface PortalEntranceRemove extends IAction {
    type: ActionType.PORTAL_ENTRANCE_REMOVE;
    portalId: string;
    entrance: PortalEntrancePacket;
}

export interface PortalExitAdd extends IAction {
    type: ActionType.PORTAL_EXIT_ADD;
    portalId: string;
}

export interface PortalExitRemove extends IAction {
    type: ActionType.PORTAL_EXIT_REMOVE;
    portalId: string;
}
