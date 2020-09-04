import {API, graphqlOperation} from "aws-amplify";
import {getDeck, listDecks, searchDecks} from "../graphql/queries";
import {createDeck, updateDeck} from "../graphql/mutations";
import {ApiDeck, DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";

export class DeckApi {

    async getById(id: DeckModel['id']): Promise<DeckModel|undefined> {
        const response: any = await API.graphql(graphqlOperation(getDeck, { id }));
        return parseApiDeck(response?.data?.getDeck);
    }

    async getList(): Promise<DeckModel[]> {
        const response: any = await API.graphql(graphqlOperation(listDecks));
        return parseApiDeckList(response?.data?.listDecks?.items);
    }

    // TODO Replace 'listDecks' with 'searchDecks' when ElasticSearch is re-added or replaced.
    async getForUser(ownerId: UserModel['id']): Promise<DeckModel[]> {
        const response: any = await API.graphql(graphqlOperation(listDecks, {
            filter: {
                ownerId: { eq: ownerId }
            }
        }));
        return parseApiDeckList(response?.data?.listDecks?.items);
    }

    // TODO
    async create(deck: DeckModel): Promise<DeckModel> {
        // const response: any = await API.graphql(graphqlOperation(createDeck, {
        //     input: TODO deck.toApiObject()
        // }))
        // return parseApiDeck(response?.data?.createDeck);
        return new Promise(resolve => {
            const result = deck.update({ id: 'TODO-'+deck.name });
            decksStore.add(result);
            resolve(result);
        });
    }
    async update(deck: DeckModel): Promise<DeckModel> {
        // const response: any = await API.graphql(graphqlOperation(updateDeck, {
        //     input: TODO deck.toApiObject()
        // }))
        // return parseApiDeck(response?.data?.updateDeck);
        return new Promise(resolve => {
            const result = deck.update({ name: 'TODO Update: '+deck.name });
            decksStore.add(result);
            resolve(result);
        });
    }

    async push(deck: DeckModel): Promise<DeckModel> {
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
