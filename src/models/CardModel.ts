import {isEqual} from "underscore";
import Model, {ModelUpdate} from "./core/Model";
import {ApiCardSide, CardSideModel} from "./CardSideModel";
import {ApiDeck} from "./DeckModel";

export type ApiCardList = NonNullable<ApiDeck['cards']>;
export type ApiCard = ApiCardList[0];

export class CardModel extends Model implements Omit<ApiCard, '__typename'|'owner'|'sides'|'deck'> {

    readonly title: string = '';
    readonly sides: readonly CardSideModel[] = [];

    static create(input: ModelUpdate<CardModel>) {
        return (new CardModel).update(input, false);
    }

    nameOrPlaceholder(placeholder = "Untitled") {
        return this.title || placeholder;
    }

    static same(first: CardModel|null|undefined, second: CardModel|null|undefined): boolean {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return isEqual(first, second);
    }
    static different(first: CardModel|null|undefined, second: CardModel|null|undefined): boolean {
        return !CardModel.same(first, second);
    }

    static fromApi(obj: ApiCard) {
        return CardModel.create({
            title: obj.title,
            sides: obj.sides?.map(
                (side: ApiCardSide) => CardSideModel.fromApi(side as ApiCardSide)
            ) || [],
        });
    }
}
export default CardModel;
