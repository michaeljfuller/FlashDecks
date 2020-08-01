import {immerable} from "immer";

/**
 * A class decorator that allows it to be handled by "immer.js".
 * @example
 *      @immutable class MyClass { ... }
 */
export default function immutable(constructor: Function) {
    (constructor as any)[immerable] = true;
}
