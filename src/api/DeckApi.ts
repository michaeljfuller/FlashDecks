import {API, graphqlOperation} from "aws-amplify";
import {getDeck, listDecks/*, searchDecks*/} from "../graphql/queries";
// import {createDeck, updateDeck} from "../graphql/mutations";
import {GetDeckQuery, GetDeckQueryVariables, ListDecksQuery, ListDecksQueryVariables} from "../API";
import {DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";
import {delayedResponse} from "./util/mock-helpers";

export type DeckApiModel = GetDeckQuery['getDeck'];
export type DeckApiModelList = ListDecksQuery['listDecks'];

export class DeckApi {

    getById(id: DeckModel['id']): ApiRequest<DeckModel|undefined> {
        const promise = API.graphql(
            graphqlOperation(getDeck, { id } as GetDeckQueryVariables)
        ) as GraphQueryResponse<GetDeckQuery>;

        return new ApiRequest(promise.then(
            response => parseApiDeck(response.data?.getDeck)
        ));
    }

    getList(variables?: ListDecksQueryVariables): ApiRequest<DeckModel[]> {
        const promise = API.graphql(
            graphqlOperation(listDecks, variables)
        ) as GraphQueryResponse<ListDecksQuery>;

        return new ApiRequest(promise.then(
            response => parseApiDeckList(response.data?.listDecks)
        ));
    }

    // TODO Replace 'listDecks' with 'searchDecks' when ElasticSearch is re-added or replaced.
    getForUser(ownerId: UserModel['id']): ApiRequest<DeckModel[]> {
        return this.getList({ filter: { ownerId: { eq: ownerId } } });
    }

    // TODO + deck.toApiObject()
    create(deck: DeckModel): ApiRequest<DeckModel> {
        console.log('DeckApi.create', deck);
        return delayedResponse(() => {
            const result = deck.update({ id: 'TODO-'+deck.name });
            decksStore.add(result);
            return result;
        });
    }

    update(deck: DeckModel): ApiRequest<DeckModel> {
        console.log('DeckApi.update', deck);
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
