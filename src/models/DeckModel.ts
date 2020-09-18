import {isEqual} from "underscore";
import {ModelUpdate} from "./core/Model";
import {GetDeckIncludingCardsQuery} from "../API";
import {UserModel} from "./UserModel";
import {CardModel} from "./CardModel";
import {ModalValidation} from "./core/Model.types";
import {filterExists} from "../utils/array";
import {CardSideModel} from "./CardSideModel";
import {CardContentModel, CardContentType} from "./CardContentModel";
import {DeckListItemModel} from "./DeckListItemModel";

export type ApiDeck = NonNullable<GetDeckIncludingCardsQuery['getDeckIncludingCards']>;

export class DeckModel extends DeckListItemModel implements Omit<ApiDeck, '__typename'|'cards'|'owner'> {
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
            name: deck.name,
            description: deck.description,
            tags: deck.tags || [],
            popularity: deck.popularity || 0,
            cards: filterExists(deck.cards?.items).map(card => CardModel.create({
                id: card.id,
                deckID: deck.id,
                name: card.name,
                ownerId: deck.ownerId,
                owner: owner,
                popularity: card.popularity || 0,
                tags: card.tags || [],
                sides: filterExists(card.sides).map(side => CardSideModel.create({
                    content: filterExists(side.content).map(content => CardContentModel.create({
                        type: content.type as CardContentType,
                        value: content.value,
                        //  side: TODO
                    }))
                }))
            })),
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
        const {name, cards=[]} = deck || {};
        const reasons: string[] = [];

        if (!name) reasons.push('Missing deck name');
        if (!cards.length) reasons.push('Missing cards');

        return { reasons, valid: reasons.length === 0, invalid: reasons.length > 0 };
    }

}
