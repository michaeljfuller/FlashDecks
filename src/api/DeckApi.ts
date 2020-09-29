import {API, graphqlOperation} from "aws-amplify";
import {getDeck, listDecks} from "../graphql/queries";
import {createDeck, updateDeck, deleteDeck} from "../graphql/mutations";
import {
    CreateDeckInput, CreateDeckMutation, CreateDeckMutationVariables,
    UpdateDeckInput, UpdateDeckMutation, UpdateDeckMutationVariables,
    GetDeckQuery, GetDeckQueryVariables,
    ListDecksQuery, ListDecksQueryVariables,
    DeleteDeckInput, DeleteDeckMutation, DeleteDeckMutationVariables,
} from "../API";
import {DeckListItemModel, DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {filterExists} from "../utils/array";

export class DeckApi {

    getById(id: GetDeckQueryVariables['id']): ApiRequest<DeckModel> {
        const variables = { id } as GetDeckQueryVariables;
        const promise = API.graphql(
            graphqlOperation(getDeck, variables)
        ) as GraphQueryResponse<GetDeckQuery>;

        promise.then(data => console.log('DeckApi.getById', id, data));

        return new ApiRequest(
            promise.then( response => {
                const apiModel = response.data?.getDeck;
                const deck = apiModel ? DeckModel.createFromApi(apiModel) : undefined;
                if (deck) decksStore.add(deck);
                return deck;
            }),
            variables
        );
    }

    getList(variables?: ListDecksQueryVariables): ApiRequest<DeckListItemModel[]> {
        const promise = API.graphql(
            graphqlOperation(listDecks, variables)
        ) as GraphQueryResponse<ListDecksQuery>;

        promise.then(data => console.log('DeckApi.getList', variables, data));

        return new ApiRequest(
            promise.then(
                response => filterExists(response.data?.listDecks?.items || []).map(DeckListItemModel.createFromApi)
            ),
            variables
        );
    }

    // TODO Replace 'listDecks' with 'searchDecks' when ElasticSearch is re-added or replaced.
    getForUser(ownerId: UserModel['id']): ApiRequest<DeckListItemModel[]> {
        return this.getList({ filter: { ownerId: { eq: ownerId } } });
    }

    create(input: CreateDeckInput): ApiRequest<DeckModel> {
        const variables = { input } as CreateDeckMutationVariables;

        const promise = API.graphql(
            graphqlOperation(createDeck, variables)
        ) as GraphQueryResponse<CreateDeckMutation>;

        return new ApiRequest(
            promise.then(response => {
                // deck.update({ id: response.data?.createDeck?.id })
                const apiDeck = response.data?.createDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            }),
            variables
        );
    }

    /**
     * TODO Delete removed cards. Same for future `DeckApi.remove()`.
     * TODO `DeckModel.source: ApiDeck` to find removed cards.
     */
    update(input: UpdateDeckInput): ApiRequest<DeckModel> {
        const variables = { input } as UpdateDeckMutationVariables;

        const promise = API.graphql(
            graphqlOperation(updateDeck, variables)
        ) as GraphQueryResponse<UpdateDeckMutation>;

        return new ApiRequest(
            promise.then( response => {
                const apiDeck = response.data?.updateDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            } ),
            variables
        );
    }

    remove(id: DeleteDeckInput['id']): ApiRequest<DeckModel> {
        const variables = { input: { id } } as DeleteDeckMutationVariables;

        const promise = API.graphql(
            graphqlOperation(deleteDeck, variables)
        ) as GraphQueryResponse<DeleteDeckMutation>;

        return new ApiRequest(
            promise.then(response => {
                const apiDeck = response.data?.deleteDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            }),
            variables
        );
    }

}

export const deckApi = new DeckApi;
export default deckApi;
