import {Observable} from "rxjs"

type CallbackBase = (...args: any) => boolean|void;

/** Branches from CallbackManager to allow individual callbacks to be added or removed, but not triggered. */
class CallbackManagerListeners<Callback extends CallbackBase> {
    constructor(private readonly callbacks: Callback[]) {}

    /** Listen for the event. If the callback returns true, it is removed. */
    add(callback: Callback) {
        if (!this.callbacks.includes(callback)) {
            this.callbacks.push(callback);
        }
    }

    /** Remove the passed callback. */
    remove(callback: Callback) {
        const index = this.callbacks.indexOf(callback);
        if (index >= 0) this.callbacks.splice(index, 1);
    }
}

/** A central place to contain, remove and trigger callbacks. */
export class CallbackManager<
    Callback extends CallbackBase = () => void
> {
    private readonly callbacks: Callback[] = [];
    readonly listeners: CallbackManagerListeners<Callback>;

    constructor() {
        this.listeners = new CallbackManagerListeners<Callback>(this.callbacks);
    }

    /** Remove all callbacks. */
    clear() {
        this.callbacks.splice(0, this.callbacks.length);
    }

    /** Call callbacks with the passed params. */
    call(...props: Parameters<Callback>) {
        for (let i=0; i < this.callbacks.length; i++) {
            const callback = this.callbacks[i];
            const result = callback(...props);
            if (result === true) this.callbacks.splice(i--, 1); // Delete item if result is === true.
        }
    }

}

/** Convert a promise to an Observable, which can be unsubscribed from when a component is unmounted. */
export function toObservable<Type>(promise: Promise<Type>): Observable<Type> {
    return new Observable(observer => {
        promise.then(
            value => observer.next(value),
            error => observer.error(error),
        ).finally(() => observer.complete()); // Observer ignores if there was an error
    });
}
