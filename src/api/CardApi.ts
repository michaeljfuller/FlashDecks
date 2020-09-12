import {API, graphqlOperation} from "aws-amplify";
import {getCard, listCards/*, searchCards*/} from "../graphql/queries";
import {createCard, updateCard} from "../graphql/mutations";
import {
    CreateCardInput, CreateCardMutation, CreateCardMutationVariables,
    GetCardQuery, GetCardQueryVariables,
    ListCardsQuery, ListCardsQueryVariables,
    UpdateCardInput, UpdateCardMutation, UpdateCardMutationVariables,
} from "../API";
import {CardModel, DeckModel} from "../models";
import cardsStore from "../store/cards/CardsStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {delayedResponse} from "./util/mock-helpers";

export type CardApiModel = GetCardQuery['getCard'];
export type CardApiModelList = ListCardsQuery['listCards'];

export class CardApi {

}

export const cardApi = new CardApi();
export default cardApi;

function parseApiCard(card: CardApiModel|undefined): CardModel|undefined {
    if (card) {
        const result = CardModel.fromApi(card);
        cardsStore.add(result);
        return result;
    }
    return undefined;
}

function parseApiCardList(cards: CardApiModelList|undefined): CardModel[] {
    return (cards?.items || []).map(
        card => parseApiCard(card as CardApiModel)
    ).filter(
        value => value !== undefined
    ) as CardModel[];
}
