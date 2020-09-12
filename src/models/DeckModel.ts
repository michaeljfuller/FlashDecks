import Model from "./core/Model";
import {CreateDeckInput, GetDeckQuery} from "../API";
import {ApiUser, UserModel} from "./UserModel";
import {CardModel} from "./CardModel";
import {ModalValidation} from "./core/Model.types";

export type ApiDeck = NonNullable<GetDeckQuery['getDeck']>;

export class DeckModel extends Model implements Omit<ApiDeck, '__typename'|'owner'|'cards'> {
    readonly id: string = '';
    readonly ownerId: string  = '';
    readonly owner?: UserModel = undefined;
    readonly name: string  = '';
    readonly description: string  = '';
    readonly tags: string[] = [];
    readonly cards: CardModel[] = [];
    readonly popularity: number = 0;

    static same(first: DeckModel|null|undefined, second: DeckModel|null|undefined): boolean {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return first !== second; // TODO Check this works as expected.
    }
    static different(first: DeckModel|null|undefined, second: DeckModel|null|undefined): boolean {
        return !DeckModel.same(first, second);
    }

    static validate(deck: DeckModel|null|undefined): ModalValidation {
        const {name, cards=[]} = deck || {};
        const reasons: string[] = [];

        if (!name) reasons.push('Missing deck name');
        if (!cards.length) reasons.push('Missing cards');

        return { reasons, valid: reasons.length === 0, invalid: reasons.length > 0 };
    }

    static fromApi(obj: ApiDeck) {
        return (new DeckModel).update({
            id: obj.id,
            ownerId: obj.ownerId,
            owner: UserModel.fromApi(obj.owner as ApiUser),
            name: obj.name,
            description: obj.description,
            tags: obj.tags || [],
            popularity: obj.popularity || 0,
            cards: obj.cards?.items?.map(
                card => CardModel.fromApi(card as any) // TODO `any` to ApiCard
            ) || [] as CardModel[],
        }, false);
    }

}
