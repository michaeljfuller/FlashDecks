import {API, graphqlOperation} from "aws-amplify";
import {getDeck, listDecks} from "../graphql/queries";
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

    /// TODO
    async getForUser(userId: UserModel['id']): Promise<DeckModel[]> {
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //
        //         const result = repeat(7, index => DeckModel.fromApi({
        //             id: `deck-${index+1}`,
        //             name: `Deck #${index+1}`,
        //             description: `Sample deck for ${userId}.`,
        //             tags: repeat(15, i => `tag-${i+1}`),
        //             ownerId: userId,
        //             owner: { id: userId, displayName: 'Owner Name' },
        //             cards: mockCards(),
        //         } as ApiDeck));
        //
        //         decksStore.add(result);
        //         resolve(result);
        //
        //     }, 1000);
        // });
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
