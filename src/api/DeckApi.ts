import {API, graphqlOperation} from "aws-amplify";
import {getDeck, listDecks/*, searchDecks*/} from "../graphql/queries";
import {createDeck, updateDeck} from "../graphql/mutations";
import {
    CreateDeckInput, CreateDeckMutation, CreateDeckMutationVariables,
    GetDeckQuery,
    GetDeckQueryVariables,
    ListDecksQuery,
    ListDecksQueryVariables,
    UpdateDeckInput, UpdateDeckMutation, UpdateDeckMutationVariables
} from "../API";
import {DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {delayedResponse} from "./util/mock-helpers";

export type DeckApiModel = GetDeckQuery['getDeck'];
export type DeckApiModelList = ListDecksQuery['listDecks'];

export class DeckApi {

    getById(id: DeckModel['id']): ApiRequest<DeckModel> {
        const variables = { id } as GetDeckQueryVariables;
        const promise = API.graphql(
            graphqlOperation(getDeck, variables)
        ) as GraphQueryResponse<GetDeckQuery>;

        return new ApiRequest(
            promise.then( response => parseApiDeck(response.data?.getDeck) ),
            variables
        );
    }

    getList(variables?: ListDecksQueryVariables): ApiRequest<DeckModel[]> {
        const promise = API.graphql(
            graphqlOperation(listDecks, variables)
        ) as GraphQueryResponse<ListDecksQuery>;

        return new ApiRequest(
            promise.then( response => parseApiDeckList(response.data?.listDecks) ),
            variables
        );
    }

    // TODO Replace 'listDecks' with 'searchDecks' when ElasticSearch is re-added or replaced.
    getForUser(ownerId: UserModel['id']): ApiRequest<DeckModel[]> {
        return this.getList({ filter: { ownerId: { eq: ownerId } } });
    }

    // TODO + deck.toApiObject()
    create(deck: DeckModel): ApiRequest<DeckModel> {
        const input: CreateDeckInput = {
            name: deck.name,
            description: deck.description,
            tags: deck.tags,
        };
        const variables = { input } as CreateDeckMutationVariables;

        const promise = API.graphql(
            graphqlOperation(createDeck, variables)
        ) as GraphQueryResponse<CreateDeckMutation>;

        console.log('DeckApi.create', graphqlOperation(createDeck, variables));

        return new ApiRequest(
            promise.then( response => parseApiDeck(response.data?.createDeck) ),
            variables
        );

        // return delayedResponse(() => {
        //     const result = deck.update({ id: 'TODO-'+deck.name });
        //     decksStore.add(result);
        //     return result;
        // });
    }

    /**
     * TODO Delete removed cards. Same for future `DeckApi.remove()`.
     * TODO `DeckModel.source: ApiDeck` to find removed cards.
     */
    update(deck: DeckModel): ApiRequest<DeckModel> {
        const input: UpdateDeckInput = {
            id: deck.id,
            name: deck.name,
            description: deck.description,
            tags: deck.tags,
        };
        const variables = { input } as UpdateDeckMutationVariables;

        const promise = API.graphql(
            graphqlOperation(updateDeck, variables)
        ) as GraphQueryResponse<UpdateDeckMutation>;

        console.log('DeckApi.update', graphqlOperation(updateDeck, variables));

        return new ApiRequest(
            promise.then( response => parseApiDeck(response.data?.updateDeck) ),
            variables
        );

        // return delayedResponse(() => {
        //     const result = deck.update({ name: 'TODO Update: '+deck.name });
        //     decksStore.add(result);
        //     return result;
        // });
    }

    push(deck: DeckModel): ApiRequest<DeckModel> {
        return deck.id ? this.update(deck) : this.create(deck);
    }
}

export const deckApi = new DeckApi;
export default deckApi;

function parseApiDeck(deck: DeckApiModel|undefined): DeckModel|undefined {
    if (deck) {
        const result = DeckModel.fromApi(deck);
        decksStore.add(result);
        return result;
    }
    return undefined;
}

function parseApiDeckList(decks: DeckApiModelList|undefined): DeckModel[] {
    return (decks?.items || []).map(
        deck => parseApiDeck(deck as DeckApiModel)
    ).filter(
        value => value !== undefined
    ) as DeckModel[];
}
