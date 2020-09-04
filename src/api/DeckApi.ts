import {API, graphqlOperation} from "aws-amplify";
import {getDeck, listDecks, searchDecks} from "../graphql/queries";
import {createDeck, updateDeck} from "../graphql/mutations";
import {ApiDeck, DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse, ApiList} from "./util/ApiTypes";
import {delayedResponse} from "./util/mock-helpers";

export class DeckApi {

    getById(id: DeckModel['id']): ApiRequest<DeckModel|undefined> {
        const promise = API.graphql(
            graphqlOperation(getDeck, { id })
        ) as GraphQueryResponse<{getDeck: ApiDeck}>;

        return new ApiRequest(promise.then(
            response => parseApiDeck(response?.data?.getDeck)
        ));
    }

    getList(): ApiRequest<DeckModel[]> {
        const promise = API.graphql(
            graphqlOperation(listDecks)
        ) as GraphQueryResponse<{listDecks: ApiList<ApiDeck>}>;

        return new ApiRequest(promise.then(
            response => parseApiDeckList(response?.data?.listDecks?.items)
        ));
    }

    // TODO Replace 'listDecks' with 'searchDecks' when ElasticSearch is re-added or replaced.
    getForUser(ownerId: UserModel['id']): ApiRequest<DeckModel[]> {
        const promise = API.graphql(graphqlOperation(listDecks, {
            filter: {
                ownerId: { eq: ownerId }
            }
        })) as GraphQueryResponse<{listDecks: ApiList<ApiDeck>}>;

        return new ApiRequest(promise.then(
            response => parseApiDeckList(response?.data?.listDecks?.items)
        ));
    }

    // TODO + deck.toApiObject()
    create(deck: DeckModel): ApiRequest<DeckModel> {
        return delayedResponse(() => {
            const result = deck.update({ id: 'TODO-'+deck.name });
            decksStore.add(result);
            return result;
        });
    }
    update(deck: DeckModel): ApiRequest<DeckModel> {
        return delayedResponse(() => {
            const result = deck.update({ name: 'TODO Update: '+deck.name });
            decksStore.add(result);
            return result;
        });
    }

    push(deck: DeckModel): ApiRequest<DeckModel> {
        return deck.id ? this.update(deck) : this.create(deck);
    }
}

export const deckApi = new DeckApi;
export default deckApi;

function parseApiDeck(deck: ApiDeck|undefined): DeckModel|undefined {
    if (deck) {
        const result = DeckModel.fromApi(deck);
        decksStore.add(result);
        return result;
    }
    return undefined;
}

function parseApiDeckList(decks: ApiDeck[]|undefined): DeckModel[] {
    console.log('parseApiDecks', decks);
    return (decks || []).map(
        parseApiDeck
    ).filter(
        value => value !== undefined
    ) as DeckModel[];
}
