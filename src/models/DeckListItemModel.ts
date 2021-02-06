import {isEqual} from "underscore";
import Model, {ModelUpdate} from "./core/Model";
import {ListDecksQuery} from "../graphql/API";
import {ModalValidation} from "./core/Model.types";
import {UserModel} from "./UserModel";

export type ApiDeckList = NonNullable<ListDecksQuery['listDecks']>;
export type ApiDeckListCollection = NonNullable<ApiDeckList['items']>;
export type ApiDeckListItem = NonNullable<ApiDeckListCollection[0]>;

export class DeckListItemModel extends Model implements Omit<ApiDeckListItem, '__typename'|'owner'|'createdAt'|'updatedAt'|'cards'> {
    readonly id: string = '';
    readonly ownerId: string  = '';
    readonly owner?: UserModel;
    readonly title: string  = '';
    readonly description: string  = '';
    readonly tags: string[] = [];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly cardCount: number = 0;

    get descriptionOrPlaceholder() {
        return this.description.trim() || "No description.";
    }

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
            title: deck.title,
            description: deck.description || '',
            ownerId: deck.ownerId,
            owner,
            tags: deck.tags || [],
            createdAt: new Date(deck.createdAt),
            updatedAt: new Date(deck.updatedAt),
            cardCount: deck.cards?.length,
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
        const {title} = deck || {};
        const reasons: string[] = [];

        if (!title) reasons.push('Missing deck title');

        return { reasons, valid: reasons.length === 0, invalid: reasons.length > 0 };
    }

}
