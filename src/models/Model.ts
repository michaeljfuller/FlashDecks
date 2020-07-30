import {immerable, produce} from "immer";
import {ModelUpdateCallback, ModelUpdateObject, ModelUpdateUnion} from "./Model.types";

/**
 * The base Model class built for "Immer.js" to make it immutable.
 * WHen `update()` is called, a new instance is created with the changes.
 */
export abstract class Model<
    ModelUpdateExcludes extends string = ''
> {

    /**
     * Create an immutable copy with changes specified by passed function/object.
     * For basic cases, you can pass an object with the properties you wish to set.
     * For more complex cases, such as with nested data, you can pass a callback that accepts an Immer Draft.
     * Modifying the Draft will make the corresponding changes to the output.
     */
    update(
        input: ModelUpdateUnion<this, ModelUpdateExcludes>
    ): this {
        if (typeof input === 'function') {
            return this.updateFromCallback(input);
        }
        return this.updateFromObject(input);
    }

    /** Use Immer to create an updated version of the class. */
    private updateFromCallback(
        callback: ModelUpdateCallback<this, ModelUpdateExcludes>
    ): this {
        return produce(this, (draft) => {
            callback(draft);
        });
    }

    /** Use Immer to create an updated version of the class with mutual properties on the passed object. */
    private updateFromObject(
        obj: ModelUpdateObject<this, ModelUpdateExcludes>
    ): this {
        return this.updateFromCallback(draft => {
            Object.getOwnPropertyNames(obj).forEach(key => { // For each property of the passed object
                (draft as any)[key] = (obj as any)[key]; // Assign value.
            });
        });
    }

}
(Model as any)[immerable] = true; // Flag for "immer"

export default Model;
