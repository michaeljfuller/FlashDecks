import {isEqual} from "underscore";
import Model, {ModelUpdate} from "./core/Model";
import {ListDecksReturningListItemsQuery} from "../API";
import {ModalValidation} from "./core/Model.types";
import {UserModel} from "./UserModel";

export type ApiDeckList = NonNullable<ListDecksReturningListItemsQuery['listDecksReturningListItems']>;
export type ApiDeckListCollection = NonNullable<ApiDeckList['items']>;
export type ApiDeckListItem = NonNullable<ApiDeckListCollection[0]>;

export class DeckListItemModel extends Model implements Omit<ApiDeckListItem, '__typename'|'owner'> {
    readonly id: string = '';
    readonly ownerId: string  = '';
    readonly owner?: UserModel = undefined;
    readonly name: string  = '';
    readonly description: string  = '';
    readonly tags: string[] = [];
    readonly popularity: number = 0;

    static create(input: ModelUpdate<DeckListItemModel>) {
        return (new DeckListItemModel).update(input, false);
    }

    static createFromApi(deck: ApiDeckListItem) {
        const owner = deck.owner ? UserModel.create({
            id: deck.owner.id,
            displayName: deck.owner.displayName
        }) : undefined;
        return DeckListItemModel.create({
            id: deck.id,
            name: deck.name,
            description: deck.description,
            ownerId: deck.ownerId,
            owner,
            popularity: deck.popularity || 0,
            tags: deck.tags || [],
        });
    }

    static same(first: DeckListItemModel|null|undefined, second: DeckListItemModel|null|undefined): boolean {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return isEqual(first, second);
    }
    static different(first: DeckListItemModel|null|undefined, second: DeckListItemModel|null|undefined): boolean {
        return !DeckListItemModel.same(first, second);
    }

    static validate(deck: DeckListItemModel|null|undefined): ModalValidation {
        const {name} = deck || {};
        const reasons: string[] = [];

        if (!name) reasons.push('Missing deck name');

        return { reasons, valid: reasons.length === 0, invalid: reasons.length > 0 };
    }

}
