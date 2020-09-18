import {API, graphqlOperation} from "aws-amplify";
// import {/*, searchDecks*/} from "../graphql/queries";
import {getDeckIncludingCards, listDecksReturningListItems} from "../graphql/custom/queries";
import {createDeckReturningPartial, updateDeckReturningPartial} from "../graphql/custom/mutations";
import {
    CreateDeckInput, CreateDeckReturningPartialMutation, CreateDeckReturningPartialMutationVariables,
    GetDeckIncludingCardsQuery, GetDeckIncludingCardsQueryVariables,
    ListDecksReturningListItemsQuery, ListDecksReturningListItemsQueryVariables,
    UpdateDeckInput, UpdateDeckReturningPartialMutation, UpdateDeckReturningPartialMutationVariables,
} from "../API";
import {DeckModel, DeckBaseModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {filterExists} from "../utils/array";

export class DeckApi {

    getById(id: DeckModel['id']): ApiRequest<DeckModel> {
        const variables = { id } as GetDeckIncludingCardsQueryVariables;
        const promise = API.graphql(
            graphqlOperation(getDeckIncludingCards, variables)
        ) as GraphQueryResponse<GetDeckIncludingCardsQuery>;

        return new ApiRequest(
            promise.then( response => {
                const apiModel = response.data?.getDeckIncludingCards;
                const deck = apiModel ? DeckModel.createFromApi(apiModel) : undefined;
                if (deck) decksStore.add(deck);
                return deck;
            }),
            variables
        );
    }

    getList(variables?: ListDecksReturningListItemsQueryVariables): ApiRequest<DeckBaseModel[]> {
        const promise = API.graphql(
            graphqlOperation(listDecksReturningListItems, variables)
        ) as GraphQueryResponse<ListDecksReturningListItemsQuery>;

        return new ApiRequest(
            promise.then(response => {
                const decks = response.data?.listDecksReturningListItems;
                return filterExists(decks?.items || []).map(DeckBaseModel.createFromApi)
            }),
            variables
        );
    }

    // TODO Replace 'listDecks' with 'searchDecks' when ElasticSearch is re-added or replaced.
    getForUser(ownerId: UserModel['id']): ApiRequest<DeckBaseModel[]> {
        return this.getList({ filter: { ownerId: { eq: ownerId } } });
    }

    create(deck: DeckBaseModel): ApiRequest<DeckBaseModel> {
        const input: CreateDeckInput = {
            name: deck.name,
            description: deck.description,
            tags: deck.tags,
        };
        const variables = { input } as CreateDeckReturningPartialMutationVariables;

        const promise = API.graphql(
            graphqlOperation(createDeckReturningPartial, variables)
        ) as GraphQueryResponse<CreateDeckReturningPartialMutation>;

        return new ApiRequest(
            promise.then( response => {
                return deck.update({ id: response.data?.createDeckReturningPartial?.id });
            } ),
            variables
        );
    }

    /**
     * TODO Delete removed cards. Same for future `DeckApi.remove()`.
     * TODO `DeckModel.source: ApiDeck` to find removed cards.
     */
    update(deck: DeckBaseModel): ApiRequest<DeckBaseModel> {
        const input: UpdateDeckInput = {
            id: deck.id,
            name: deck.name,
            description: deck.description,
            tags: deck.tags,
        };
        const variables = { input } as UpdateDeckReturningPartialMutationVariables;

        const promise = API.graphql(
            graphqlOperation(updateDeckReturningPartial, variables)
        ) as GraphQueryResponse<UpdateDeckReturningPartialMutation>;

        return new ApiRequest(
            promise.then( response => {
                const partial = response.data?.updateDeckReturningPartial;
                return partial ? deck.update({
                    id: partial.id,
                    name: partial.name,
                    description: partial.description,
                    popularity: partial.popularity || 0,
                    tags: partial.tags || [],
                    ownerId: partial.ownerId,
                }) : deck;
            } ),
            variables
        );
    }

    push(deck: DeckBaseModel): ApiRequest<DeckBaseModel> {
        return deck.id ? this.update(deck) : this.create(deck);
    }

}

export const deckApi = new DeckApi;
export default deckApi;
