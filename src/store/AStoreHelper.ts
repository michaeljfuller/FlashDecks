import {store as defaultStore} from "./store";
import {Store, Unsubscribe} from "redux";

/**
 * Helper to get and subscribe to a sub-state.
 */
export default abstract class AStoreHelper<StateType> {
    constructor(protected readonly store: Store = defaultStore){}

    /** The sub-state we're interested in. */
    abstract readonly stateName: string;

    /** Get the current value of [stateName] from the store. */
    get state(): StateType {
        return this.store.getState()[this.stateName] as StateType;
    }

    /** Subscribe to [stateName] in the store. */
    subscribe(listener: (state: StateType) => void): Unsubscribe {
        return this.store.subscribe(() => listener(this.state));
    }
}
