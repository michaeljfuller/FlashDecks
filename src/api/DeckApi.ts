import {ApiDeck, DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import {repeat} from "../utils/array";

export class DeckApi {

    async getList(): Promise<DeckModel[]> {
        return new Promise(resolve => {
            setTimeout(() => {

                const result = repeat(7, index => DeckModel.fromApi({
                    id: `deck-${index+1}`,
                    name: `Deck #${index+1}`,
                    description: `Sample deck for List.`,
                    ownerId: `user-${index+1}`,
                    owner: { id: `user-${index+1}`, displayName: `Owner ${index+1}` },
                } as ApiDeck));

                decksStore.add(result);
                resolve(result);

            }, 1000);
        });
    }

    async getForUser(userId: UserModel['id']): Promise<DeckModel[]> {
        return new Promise(resolve => {
            setTimeout(() => {

                const result = repeat(7, index => DeckModel.fromApi({
                    id: `deck-${index+1}`,
                    name: `Deck #${index+1}`,
                    description: `Sample deck for ${userId}.`,
                    ownerId: userId,
                    owner: { id: userId, displayName: 'Owner Name' },
                } as ApiDeck));

                decksStore.add(result);
                resolve(result);

            }, 1000);
        });
    }

}

export const deckApi = new DeckApi;
export default deckApi;
