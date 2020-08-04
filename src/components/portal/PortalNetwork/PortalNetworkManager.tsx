import {Component} from "react";
import {BehaviorSubject} from "rxjs";

const defaultNetworkId = Symbol('PortalNetworkManager.defaultNetworkId');

export interface PortalNetworkLink {
    exit: HTMLDivElement|null;
    entrances: Component[];
    onChange: LinkChangeBehavior;
}

export type LinkChangeBehavior = BehaviorSubject<PortalNetworkLinkChangeData>;
export type PortalNetworkLinkChangeData = Omit<Readonly<PortalNetworkLink>, 'onChange'>;

function createLink() {
    return {
        exit: null,
        entrances: [],
        onChange: new BehaviorSubject<PortalNetworkLinkChangeData>({ exit: null, entrances: [] }),
    } as PortalNetworkLink;
}

/**
 * A manager that links PortalEntrances to a PortalExit by a common ***networkId***.
 */
export class PortalNetworkManager {

    private links: Record<string|typeof defaultNetworkId, PortalNetworkLink> = {
        [defaultNetworkId]: createLink(),
    };

    //<editor-fold desc="Links">

    private getLink(id?: string): PortalNetworkLink {
        const networkId = id || defaultNetworkId;
        return this.links[networkId] || (this.links[networkId] = createLink());
    }

    private onLinkChanged(id?: string) {
        const link = this.getLink(id);
        link.onChange.next(link);
    }

    subscribeToLinkChanges(
        callback: (value: PortalNetworkLinkChangeData) => void,
        id?: string
    ) {
        return this.getLink(id).onChange.subscribe(callback);
    }

    //</editor-fold>
    //<editor-fold desc="Exit">

    addExit(element: HTMLDivElement|null, id?: string) {
        const link = this.getLink(id);
        if (link.exit) {
            if (link.exit === element) return; // No change
            console.warn(`Warning: Overwriting PortalNetwork exit ${id ? `"${id}"` : '[default]'}, which was already set.`);
        }
        link.exit = element;
        this.onLinkChanged(id);
    }

    getExit(id?: string) {
        return this.getLink(id).exit;
    }

    removeExit(element: HTMLDivElement|null, id?: string) {
        const link = this.getLink(id);
        if (!element || element === link.exit) {
            link.exit = null;
            this.onLinkChanged(id);
        }
    }

    //</editor-fold>
    //<editor-fold desc="Entrances">

    addEntrance(element: Component, id?: string) {
        const link = this.getLink(id);
        if (link.entrances.indexOf(element) >= 0) {
            console.warn(`Warning: This PortalNetwork entrance has already been added to ${id ? `"${id}"` : '[default]'}.`);
        } else {
            link.entrances.push(element);
            this.onLinkChanged(id);
        }
    }

    getEntrances(id?: string) {
        return this.getLink(id).entrances;
    }

    removeEntrance(element: Component, id?: string) {
        const link = this.getLink(id);
        const index = link.entrances.indexOf(element);
        if (index >= 0) {
            link.entrances.splice(index, 1);
            this.onLinkChanged(id);
        }
    }

    //</editor-fold>

}
