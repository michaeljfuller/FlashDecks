import {produce} from "immer";
import immutable from "./immutable";
import {ModelUpdateCallback, ModelUpdateObject, ModelUpdateUnion} from "./Model.types";

type DefaultModelUpdateExcludes = 'isDirty';
export type ModelUpdate<TargetModel, UpdateExcludes extends string = ''> = ModelUpdateUnion<TargetModel, UpdateExcludes|DefaultModelUpdateExcludes>;

/**
 * The base Model class built for "Immer.js" to make it immutable.
 * WHen `update()` is called, a new instance is created with the changes.
 */
@immutable
export abstract class Model<
    ModelUpdateExcludes extends string = ''
> {
    /** Flag indicating if the modal has been modified from its source. */
    readonly isDirty: boolean = false;

    /**
     * Create an immutable copy with changes specified by passed function/object.
     * For basic cases, you can pass an object with the properties you wish to set.
     * For more complex cases, such as with nested data, you can pass a callback that accepts an Immer Draft.
     * Modifying the Draft will make the corresponding changes to the output.
     */
    update(
        input: ModelUpdate<this, ModelUpdateExcludes>,
        isDirty = true
    ): this {
        if (typeof input === 'function') {
            return this.updateFromCallback(input, isDirty);
        }
        return this.updateFromObject(input, isDirty);
    }

    /** Use Immer to create an updated version of the class. */
    private updateFromCallback(
        callback: ModelUpdateCallback<this, ModelUpdateExcludes|DefaultModelUpdateExcludes>,
        isDirty = true
    ): this {
        return produce(this, (draft) => {
            draft.isDirty = isDirty;
            callback(draft);
        });
    }

    /** Use Immer to create an updated version of the class with mutual properties on the passed object. */
    private updateFromObject(
        obj: ModelUpdateObject<this, ModelUpdateExcludes|DefaultModelUpdateExcludes>,
        isDirty = true
    ): this {
        return this.updateFromCallback(draft => {
            Object.getOwnPropertyNames(obj).forEach(key => { // For each property of the passed object
                (draft as any)[key] = (obj as any)[key]; // Assign value.
            });
        }, isDirty);
    }

}

export default Model;
