import {API, graphqlOperation} from "aws-amplify";
import {getCard, listCards/*, searchCards*/} from "../graphql/queries";
import {createCard, updateCard} from "../graphql/mutations";
import {
    CreateCardInput, CreateCardMutation, CreateCardMutationVariables,
    GetCardQuery, GetCardQueryVariables,
    ListCardsQuery, ListCardsQueryVariables,
    UpdateCardInput, UpdateCardMutation, UpdateCardMutationVariables,
} from "../API";
import {CardModel, UserModel} from "../models";
import cardsStore from "../store/cards/CardsStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {delayedResponse} from "./util/mock-helpers";

export type CardApiModel = GetCardQuery['getCard'];
export type CardApiModelList = ListCardsQuery['listCards'];

export class CardApi {

    getById(id: CardModel['id']): ApiRequest<CardModel> {
        const variables = { id } as GetCardQueryVariables;
        const promise = API.graphql(
            graphqlOperation(getCard, variables)
        ) as GraphQueryResponse<GetCardQuery>;

        return new ApiRequest(
            promise.then( response => parseApiCard(response.data?.getCard) ),
            variables
        );
    }

    getList(variables?: ListCardsQueryVariables): ApiRequest<CardModel[]> {
        const promise = API.graphql(
            graphqlOperation(listCards, variables)
        ) as GraphQueryResponse<ListCardsQuery>;

        return new ApiRequest(
            promise.then( response => parseApiCardList(response.data?.listCards) ),
            variables
        );
    }

    // TODO Replace 'listCards' with 'searchCards' when ElasticSearch is re-added or replaced.
    getForUser(ownerId: UserModel['id']): ApiRequest<CardModel[]> {
        return this.getList({ filter: { ownerId: { eq: ownerId } } });
    }

    // TODO + card.toApiObject()
    create(card: CardModel): ApiRequest<CardModel> {
        type CreateCardInputSide = NonNullable<CreateCardInput['sides']>[0];
        type CreateCardInputContent = NonNullable<CreateCardInputSide['content']>[0];

        const input: CreateCardInput = {
            deckID: card.deckID,
            name: card.name,
            sides: card.sides.map<CreateCardInputSide>(side => ({
                content: side.content.map<CreateCardInputContent>(content => ({
                    type: content.type || '',
                    value: content.value,
                }))
            })),
            tags: card.tags,
        };
        const variables = { input } as CreateCardMutationVariables;

        const promise = API.graphql(
            graphqlOperation(createCard, variables)
        ) as GraphQueryResponse<CreateCardMutation>;

        console.log('CardApi.create', graphqlOperation(createCard, variables));

        return new ApiRequest(
            promise.then( response => parseApiCard(response.data?.createCard) ),
            variables
        );

        // return delayedResponse(() => {
        //     const result = card.update({ id: 'TODO-'+card.name });
        //     cardsStore.add(result);
        //     return result;
        // });
    }

    /**
     * TODO Delete removed cards. Same for future `CardApi.remove()`.
     * TODO `CardModel.source: ApiCard` to find removed cards.
     * TODO Add/update cards.
     */
    update(card: CardModel): ApiRequest<CardModel> {
        type UpdateCardInputSide = NonNullable<UpdateCardInput['sides']>[0];
        type UpdateCardInputContent = NonNullable<UpdateCardInputSide['content']>[0];

        const input: UpdateCardInput = {
            id: card.id,
            deckID: card.deckID,
            name: card.name,
            sides: card.sides.map<UpdateCardInputSide>(side => ({
                content: side.content.map<UpdateCardInputContent>(content => ({
                    type: content.type || '',
                    value: content.value,
                }))
            })),
            tags: card.tags,
        };
        const variables = { input } as UpdateCardMutationVariables;

        const promise = API.graphql(
            graphqlOperation(updateCard, variables)
        ) as GraphQueryResponse<UpdateCardMutation>;

        console.log('CardApi.update', graphqlOperation(updateCard, variables));

        return new ApiRequest(
            promise.then( response => parseApiCard(response.data?.updateCard) ),
            variables
        );

        // return delayedResponse(() => {
        //     const result = card.update({ name: 'TODO Update: '+card.name });
        //     cardsStore.add(result);
        //     return result;
        // });
    }

    push(card: CardModel): ApiRequest<CardModel> {
        return card.id ? this.update(card) : this.create(card);
    }

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
