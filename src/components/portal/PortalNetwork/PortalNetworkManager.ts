import {BehaviorSubject} from "rxjs";
import {PortalExit} from "../PortalExit";
import {PortalEntrance} from "../PortalEntrance";

export interface PortalNetworkLink {
    portalId: string;
    exit: PortalExit|null;
    entrances: PortalEntrance[];
    onChange: LinkChangeBehavior;
}

export type LinkChangeBehavior = BehaviorSubject<PortalNetworkLinkChangeData>;
export type PortalNetworkLinkChangeData = Omit<Readonly<PortalNetworkLink>, 'onChange'>;

function createLink(portalId: string) {
    return {
        portalId,
        exit: null,
        entrances: [],
        onChange: new BehaviorSubject<PortalNetworkLinkChangeData>({
            portalId,
            exit: null,
            entrances: []
        }),
    } as PortalNetworkLink;
}

/**
 * A manager that links PortalEntrances to a PortalExit by a common ***networkId***.
 */
export class PortalNetworkManager {

    private links: Record<string, PortalNetworkLink> = {};

    //<editor-fold desc="Links">

    private getLink(portalId: string): PortalNetworkLink {
        return this.links[portalId] || (this.links[portalId] = createLink(portalId));
    }

    private onLinkChanged(portalId: string) {
        const link = this.getLink(portalId);
        link.onChange.next(link);
    }

    subscribeToLinkChanges(
        portalId: string,
        callback: (value: PortalNetworkLinkChangeData) => void
    ) {
        return this.getLink(portalId).onChange.subscribe(callback);
    }

    //</editor-fold>
    //<editor-fold desc="Exit">

    addExit(portalId: string, exit: PortalExit|null) {
        const link = this.getLink(portalId);
        if (link.exit) {
            if (link.exit === exit) return; // No change
            console.warn(`Warning: Overwriting PortalNetwork exit ${portalId}, which was already set.`);
        }
        link.exit = exit;
        this.onLinkChanged(portalId);
    }

    getExit(portalId: string) {
        return this.getLink(portalId).exit;
    }

    removeExit(portalId: string, exit: PortalExit|null) {
        const link = this.getLink(portalId);
        if (!exit || exit === link.exit) {
            link.exit = null;
            this.onLinkChanged(portalId);
        }
    }

    //</editor-fold>
    //<editor-fold desc="Entrances">

    addEntrance(portalId: string, entrance: PortalEntrance) {
        const link = this.getLink(portalId);
        if (link.entrances.indexOf(entrance) >= 0) {
            console.warn(`Warning: This PortalNetwork entrance has already been added to ${portalId}.`);
        } else {
            link.entrances.push(entrance);
            this.onLinkChanged(portalId);
        }
    }

    getEntrances(portalId: string) {
        return this.getLink(portalId).entrances;
    }

    removeEntrance(portalId: string, entrance: PortalEntrance) {
        const link = this.getLink(portalId);
        const index = link.entrances.indexOf(entrance);
        if (index >= 0) {
            link.entrances.splice(index, 1);
            this.onLinkChanged(portalId);
        }
    }

    //</editor-fold>

}
