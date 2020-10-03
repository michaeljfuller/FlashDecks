import {isEqual} from "underscore";
import {ModelUpdate} from "./core/Model";
import {GetDeckQuery} from "../API";
import {UserModel} from "./UserModel";
import {CardModel} from "./CardModel";
import {ModalValidation} from "./core/Model.types";
import {filterExists} from "../utils/array";
import {DeckListItemModel} from "./DeckListItemModel";

export type ApiDeck = NonNullable<GetDeckQuery['getDeck']>;

export class DeckModel extends DeckListItemModel implements Omit<ApiDeck, '__typename'|'cards'|'owner'|'createdAt'|'updatedAt'> {
    readonly ownerId: string  = '';
    readonly owner?: UserModel;
    readonly title: string  = '';
    readonly description: string  = '';
    readonly tags: string[] = [];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly cards: CardModel[] = [];

    static create(input: ModelUpdate<DeckModel>) {
        return (new DeckModel).update(input, false);
    }

    static createFromApi(deck: ApiDeck) {
        const owner = deck.owner ? UserModel.create({
            id: deck.owner.id,
            displayName: deck.owner.displayName
        }) : undefined;
        return DeckModel.create({
            id: deck.id,
            ownerId: deck.ownerId,
            owner: owner,
            title: deck.title,
            description: deck.description,
            tags: deck.tags || [],
            createdAt: new Date(deck.createdAt),
            updatedAt: new Date(deck.updatedAt),
            cards: filterExists(deck.cards).map(CardModel.fromApi),
        });
    }

    static same(first: DeckModel|null|undefined, second: DeckModel|null|undefined): boolean {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return isEqual(first, second);
    }
    static different(first: DeckModel|null|undefined, second: DeckModel|null|undefined): boolean {
        return !DeckModel.same(first, second);
    }

    static validate(deck: DeckModel|null|undefined): ModalValidation {
        const {title, cards=[]} = deck || {};
        const reasons: string[] = [];

        if (!title) reasons.push('Missing deck title');
        if (!cards.length) reasons.push('Missing cards');

        return { reasons, valid: reasons.length === 0, invalid: reasons.length > 0 };
    }

}
