import {store as defaultStore, StateName} from "./store";
import {Store, Unsubscribe} from "redux";

/**
 * Helper to get and subscribe to a sub-state.
 */
export default abstract class AStoreHelper<StateType> {
    constructor(
        protected readonly stateName: StateName,
        protected readonly store: Store = defaultStore,
    ){}

    /** Get the current value of [stateName] from the store. */
    get state(): StateType {
        return this.store.getState()[this.stateName] as StateType;
    }

    /** Subscribe to [stateName] in the store. */
    subscribe(listener: (state: StateType) => void): Unsubscribe {
        return this.store.subscribe(() => listener(this.state));
    }
}
