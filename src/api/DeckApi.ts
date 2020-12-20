import {API, graphqlOperation} from "aws-amplify";
import {DeckListItemModel, DeckModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {filterExists} from "../utils/array";
import {logClass} from "../utils/debugging/decorators/logClass";
import {
    getDeck, GetDeckQueryString, GetDeckQueryVariables,
    getDecksByOwner, GetDecksByOwnerQueryString, GetDecksByOwnerQueryVariables,
    listDecks, ListDecksQueryString, ListDecksQueryVariables,
    createDeck, CreateDeckMutationString, CreateDeckInput,
    updateDeck, UpdateDeckMutationString,
    deleteDeck, DeleteDeckMutation, DeleteDeckInput, DeleteDeckMutationVariables,
    VariablesFromQueryString, ResponseFromQueryString,
} from "./DeckApi.queries";

@logClass({ enabled: true })
export class DeckApi {

    getById(
        id: GetDeckQueryVariables['id']
    ): ApiRequest<DeckModel, GetDeckQueryVariables> {
        const variables = { id } as GetDeckQueryVariables;
        return new ApiRequest(
            sendGet(getDeck, variables).then(response => {
                const apiModel = response.data?.getDeck;
                const deck = apiModel ? DeckModel.createFromApi(apiModel) : undefined;
                if (deck) decksStore.add(deck);
                return deck;
            }),
            variables
        );
    }

    getList(
        variables?: ListDecksQueryVariables
    ): ApiRequest<DeckListItemModel[], ListDecksQueryVariables> {
        return new ApiRequest(
            sendGet(listDecks, variables).then(
                response => filterExists(response.data?.listDecks?.items || []).map(DeckListItemModel.createFromApi)
            ),
            variables
        );
    }

    getForUser(
        ownerId: string,
        options: Omit<GetDecksByOwnerQueryVariables, 'ownerId'>
    ): ApiRequest<DeckListItemModel[], GetDecksByOwnerQueryVariables> {
        const variables: GetDecksByOwnerQueryVariables = { ownerId, ...options };
        return new ApiRequest(
            sendGet(getDecksByOwner, variables).then(
                response => filterExists(response.data?.getDecksByOwner?.items || []).map(DeckListItemModel.createFromApi)
            ),
            variables
        );
    }

    create(deck: DeckModel): ApiRequest<DeckModel, DeckModel> {
        return new ApiRequest(
            sendCreateOrUpdate(createDeck, deck).then( response => {
                const apiDeck = response.data?.createDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            } ),
            deck
        );
    }

    update(deck: DeckModel): ApiRequest<DeckModel, DeckModel> {
        return new ApiRequest(
            sendCreateOrUpdate(updateDeck, deck).then(response => {
                const apiDeck = response.data?.updateDeck;
                return apiDeck ? DeckModel.createFromApi(apiDeck) : undefined;
            }),
            deck
        );
    }

    remove(id: DeleteDeckInput['id']): ApiRequest<DeckModel, DeleteDeckMutationVariables> {
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

/** Make the request to get deck(s). */
function sendGet<
    Query extends GetDeckQueryString | GetDecksByOwnerQueryString | ListDecksQueryString,
    Vars extends VariablesFromQueryString<Query>,
    Data extends ResponseFromQueryString<Query>
>(query: Query, variables: Vars): Promise<{ data?: Data }> { // Use "Promise" alias for GraphQueryResponse so type checking for async func works.
    return API.graphql(
        graphqlOperation(query, variables)
    ) as GraphQueryResponse<Data>;
}

/** Send the deck to be created/updated */
async function sendCreateOrUpdate<
    Query extends CreateDeckMutationString | UpdateDeckMutationString,
    Vars extends VariablesFromQueryString<Query>,
    Data extends ResponseFromQueryString<Query>
>(query: Query, deck: DeckModel): Promise<{ data?: Data }> { // Use "Promise" alias for GraphQueryResponse so type checking for async func works.
    const input: Vars['input'] = {
        title: deck.title,
        description: deck.description,
        tags: deck.tags,
        cards: deck.cards?.map(card => ({
            title: card.title,
            sides: card.sides?.map(side => ({
                content: side.content?.map(content => ({
                    value: content.value,
                    type: content.type as any
                }))
            }))
        }))
    } as CreateDeckInput;
    if (query === updateDeck) input.id = deck.id;

    return await API.graphql(
        graphqlOperation(query, { input } as Vars)
    ) as GraphQueryResponse<Data>;
}

