import {API, graphqlOperation} from "aws-amplify";
import * as Queries from "./DeckApi.queries";
import {DeckListItemModel, DeckModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {filterExists} from "../utils/array";

export class DeckApi {

    getById(id: Queries.GetDeckQueryVariables['id']): ApiRequest<DeckModel> {
        const variables = { id } as Queries.GetDeckQueryVariables;
        return new ApiRequest(
            this.sendGet(Queries.getDeck, variables).then( response => {
                const apiModel = response.data?.getDeck;
                const deck = apiModel ? DeckModel.createFromApi(apiModel) : undefined;
                if (deck) decksStore.add(deck);
                return deck;
            }),
            variables
        );
    }

    getList(variables?: Queries.ListDecksQueryVariables): ApiRequest<DeckListItemModel[]> {
        return new ApiRequest(
            this.sendGet(Queries.listDecks, variables).then(
                response => filterExists(response.data?.listDecks?.items || []).map(DeckListItemModel.createFromApi)
            ),
            variables
        );
    }

    getForUser(ownerId: string, options: Omit<Queries.GetDecksByOwnerQueryVariables, 'ownerId'>): ApiRequest<DeckListItemModel[]> {
        const variables: Queries.GetDecksByOwnerQueryVariables = { ownerId, ...options };
        return new ApiRequest(
            this.sendGet(Queries.getDecksByOwner, variables).then(
                response => filterExists(response.data?.getDecksByOwner?.items || []).map(DeckListItemModel.createFromApi)
            ),
            variables
        );
    }

    create(input: Queries.CreateDeckInput): ApiRequest<DeckModel> {
        const variables = { input } as Queries.CreateDeckMutationVariables;
        return new ApiRequest(
            this.sendCreateOrUpdate(Queries.createDeck, variables).then( response => {
                const apiDeck = response.data?.createDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            } ),
            variables
        );
    }

    update(input: Queries.UpdateDeckInput): ApiRequest<DeckModel> {
        const variables = { input } as Queries.UpdateDeckMutationVariables;
        return new ApiRequest(
            this.sendCreateOrUpdate(Queries.updateDeck, variables).then( response => {
                const apiDeck = response.data?.updateDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            } ),
            variables
        );
    }

    remove(id: Queries.DeleteDeckInput['id']): ApiRequest<DeckModel> {
        const variables = { input: { id } } as Queries.DeleteDeckMutationVariables;

        const promise = API.graphql(
            graphqlOperation(Queries.deleteDeck, variables)
        ) as GraphQueryResponse<Queries.DeleteDeckMutation>;

        return new ApiRequest(
            promise.then(response => {
                const apiDeck = response.data?.deleteDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            }),
            variables
        );
    }

    private sendGet<
        Q extends Queries.GetDeckQueryString | Queries.GetDecksByOwnerQueryString | Queries.ListDecksQueryString,
        V extends Queries.VariablesFromQueryString<Q>,
        M extends Queries.QueryFromQueryString<Q>
        >(query: Q, variables: V): Promise<{ data?: M }> { // Use "Promise" alias for GraphQueryResponse so type checking for async func works.
        return API.graphql(
            graphqlOperation(query, variables)
        ) as GraphQueryResponse<M>;
    }

    private async sendCreateOrUpdate<
        Q extends Queries.CreateDeckMutationString | Queries.UpdateDeckMutationString,
        V extends Queries.VariablesFromQueryString<Q>,
        M extends Queries.QueryFromQueryString<Q>
    >(query: Q, variables: V): Promise<{ data?: M }> { // Use "Promise" alias for GraphQueryResponse so type checking for async func works.
        variables.input = await this.uploadContent(variables.input);
        return API.graphql(
            graphqlOperation(query, variables)
        ) as GraphQueryResponse<M>;
    }

    private async uploadContent<T extends Queries.CreateDeckInput|Queries.UpdateDeckInput>(input: T): Promise<T> {
        return input;
    }

}

export const deckApi = new DeckApi;
export default deckApi;
