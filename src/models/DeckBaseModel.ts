import {isEqual} from "underscore";
import Model, {ModelUpdate} from "./core/Model";
import {CreateDeckReturningPartialMutation} from "../API";
import {ModalValidation} from "./core/Model.types";

export type ApiPartialDeck = NonNullable<CreateDeckReturningPartialMutation['createDeckReturningPartial']>;

export class DeckBaseModel extends Model implements Omit<ApiPartialDeck, '__typename'> {
    readonly id: string = '';
    readonly ownerId: string  = '';
    readonly name: string  = '';
    readonly description: string  = '';
    readonly tags: string[] = [];
    readonly popularity: number = 0;

    static create(input: ModelUpdate<DeckBaseModel>) {
        return (new DeckBaseModel).update(input, false);
    }

    static createFromApi(deck: ApiPartialDeck) {
        return DeckBaseModel.create({
            id: deck.id,
            name: deck.name,
            description: deck.description,
            ownerId: deck.ownerId,
            popularity: deck.popularity || 0,
            tags: deck.tags || [],
        });
    }

    static same(first: DeckBaseModel|null|undefined, second: DeckBaseModel|null|undefined): boolean {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return isEqual(first, second);
    }
    static different(first: DeckBaseModel|null|undefined, second: DeckBaseModel|null|undefined): boolean {
        return !DeckBaseModel.same(first, second);
    }

    static validate(deck: DeckBaseModel|null|undefined): ModalValidation {
        const {name} = deck || {};
        const reasons: string[] = [];

        if (!name) reasons.push('Missing deck name');

        return { reasons, valid: reasons.length === 0, invalid: reasons.length > 0 };
    }

}
