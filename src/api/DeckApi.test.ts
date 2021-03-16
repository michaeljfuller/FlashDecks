//<editor-fold desc="Mocks">

import {API as _API, graphqlOperation as _graphqlOperation} from "aws-amplify";
import {MockApi, mockApiMethods} from "../../__mocks__/aws-amplify/MockApi";

jest.mock("aws-amplify");
const API: MockApi = _API as any;
const graphqlOperation = _graphqlOperation as jest.MockedFunction<typeof _graphqlOperation>;

jest.mock("../utils/Logger");

//</editor-fold>
//<editor-fold desc="Imports">

import {DeckApi} from "./DeckApi";
import {ApiDeck, CardModel, CardSideModel, CardContentModel, DeckListItemModel, DeckModel} from "../models";
import {
    CardSideContentType,
    CreateDeckMutationVariables,
    UpdateDeckMutationVariables
} from "../graphql/API";
import {createDeck, updateDeck} from "../graphql/mutations";

//</editor-fold>
//<editor-fold desc="Helpers">

function createApiDeck(options: Partial<{
    id: string;
    title: string;
    ownerId: string;
}> = {}): ApiDeck {
    const {
        id = "mock-id",
        title = "mock-title",
        ownerId = "mock-owner-id",
    } = options;
    return {
        __typename: "Deck",
        id,
        title,
        description: "mock-description",
        createdAt: "",
        updatedAt: "",
        ownerId,
        owner: {
            __typename: "User",
            id: ownerId,
            userName: "mock-username",
            displayName: "mock-user-displayName",
        },
        cards: [],
        tags: [],
    };
}

//</editor-fold>

describe("DeckApi", () => {
    let deckApi: DeckApi;
    beforeEach(() => deckApi = new DeckApi());
    afterEach(() => {
        API.mocks.resetAll();
        graphqlOperation.mockReset();
    });

    describe("#getById", () => {

        it("returns a Deck", async () => {
            const id = "test-id", title = "test-title", ownerId = "test-ownerId";
            const deck = createApiDeck({ id, title, ownerId });
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { getDeck: deck } })
            );
            const result = await deckApi.getById("id").toPromise();
            expect(result).toBeInstanceOf(DeckModel);
            expect(result?.id).toBe(id);
            expect(result?.title).toBe(title);
            expect(result?.ownerId).toBe(ownerId);
        });

        it("errors if no data", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({})
            );
            return expect(
                deckApi.getById("id").toPromise()
            ).rejects.toThrow("No response object.");
        });

        it("errors on failure", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.error(new Error("test-error"))
            );
            return expect(
                deckApi.getById("id").toPromise()
            ).rejects.toThrow("test-error");
        });

    });
    describe("#getList", () => {

        it("returns an array of Decks", async () => {
            const decks = [
                createApiDeck({ id: "deck-1" }),
                createApiDeck({ id: "deck-2" }),
            ];
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { listDecks: { items: decks } } })
            );
            const result = await deckApi.getList().toPromise();
            expect(result?.decks).toHaveLength(2);
            expect(result.decks[0]).toBeInstanceOf(DeckListItemModel);
            expect(result.decks[1]).toBeInstanceOf(DeckListItemModel);
            expect(result.decks[0]?.id).toBe("deck-1");
            expect(result.decks[1]?.id).toBe("deck-2");
        });

        it("only returns valid decks", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { listDecks: { items: [
                    null, createApiDeck({ id: "test-id" }), null
                ]}}})
            );
            const result = await deckApi.getList().toPromise();
            expect(result?.decks).toHaveLength(1);
            expect(result.decks[0]).toBeInstanceOf(DeckListItemModel);
            expect(result.decks[0]?.id).toBe("test-id");
        });

        it("errors on failure", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.error(new Error("test-error"))
            );
            return expect(
                deckApi.getList().toPromise()
            ).rejects.toThrow("test-error");
        });

    });
    describe("#getForUser", () => {

        it("returns an array of Decks", async () => {
            const decks = [
                createApiDeck({ id: "deck-1" }),
                createApiDeck({ id: "deck-2" }),
            ];
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { getDecksByOwner: { items: decks } } })
            );
            const result = await deckApi.getForUser("test-userId").toPromise();
            expect(result?.decks).toHaveLength(2);
            expect(result.decks[0]).toBeInstanceOf(DeckListItemModel);
            expect(result.decks[1]).toBeInstanceOf(DeckListItemModel);
            expect(result.decks[0]?.id).toBe("deck-1");
            expect(result.decks[1]?.id).toBe("deck-2");
        });

        it("only returns valid decks", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { getDecksByOwner: { items: [
                    null, createApiDeck({ id: "test-id" }), null
                ]}}})
            );
            const result = await deckApi.getForUser("test-userId").toPromise();
            expect(result?.decks).toHaveLength(1);
            expect(result.decks[0]).toBeInstanceOf(DeckListItemModel);
            expect(result.decks[0]?.id).toBe("test-id");
        });

        it("errors on failure", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.error(new Error("test-error"))
            );
            return expect(
                deckApi.getList().toPromise()
            ).rejects.toThrow("test-error");
        });

    });
    describe("#create", () => {

        it("handles being passed a DeckModel", async () => {
            API.graphql.mockImplementationOnce(
                    mockApiMethods.graphql.success({ data: { createDeck: createApiDeck() } })
            );
            const input = {
                title: "deck-title",
                description: "deck-description",
                tags: ["deck-tag"],
                cards: [{
                    title: "card-title",
                    sides: [{
                        content: [{
                            value: "content-value", type: CardSideContentType.Text, size: 0.5,
                        }],
                    }],
                }],
            };
            const deck = DeckModel.create({
                title: input.title,
                description: input.description,
                tags: input.tags,
                cards: [CardModel.create({
                    title: input.cards[0].title,
                    sides: [CardSideModel.create({
                        content: [CardContentModel.create({
                            value: input.cards[0].sides[0].content[0].value,
                            type: input.cards[0].sides[0].content[0].type,
                            size: input.cards[0].sides[0].content[0].size,
                        })],
                    })],
                })],
            });
            try {
                await deckApi.create(deck);
            } catch (e) {
                console.log(e);
            }
            expect(graphqlOperation).toHaveBeenCalledWith(createDeck, { input });
        });

        it("handles being passed UpdateDeckMutationVariables", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { createDeck: createApiDeck() } })
            );
            const input = {
                title: "deck-title",
                description: "deck-description",
                tags: ["deck-tag"],
                cards: [{
                    title: "card-title",
                    sides: [{
                        content: [{
                            value: "content-value", type: CardSideContentType.Text, size: 0.5,
                        }],
                    }],
                }],
            };
            await deckApi.create({ input } as CreateDeckMutationVariables);
            expect(graphqlOperation).toHaveBeenCalledWith(createDeck, { input });
        });

        it("returns the Deck", async () => {
            const deck = createApiDeck({ id: "deck-id", title: "deck-title", ownerId: "owner-id" });
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { createDeck: deck } })
            );
            const result = await deckApi.create(DeckModel.createFromApi(deck)).toPromise();
            expect(result).toBeInstanceOf(DeckModel);
            expect(result?.id).toBe(deck.id);
            expect(result?.title).toBe(deck.title);
            expect(result?.ownerId).toBe(deck.ownerId);
        });

        it("errors if no data", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({})
            );
            return expect(
                deckApi.create(DeckModel.createFromApi(createApiDeck())).toPromise()
            ).rejects.toThrow("Failed to parse deck");
        });

        it("errors on failure", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.error(new Error("test-error"))
            );
            return expect(
                deckApi.create(DeckModel.createFromApi(createApiDeck())).toPromise()
            ).rejects.toThrow("test-error");
        });

    });
    describe("#update", () => {

        it("handles being passed a DeckModel", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { updateDeck: createApiDeck() } })
            );
            const input = {
                id: "deck-id",
                title: "deck-title",
                description: "deck-description",
                tags: ["deck-tag"],
                cards: [{
                    title: "card-title",
                    sides: [{
                        content: [{
                            value: "content-value", type: CardSideContentType.Text, size: 0.5,
                        }],
                    }],
                }],
            };
            const deck = DeckModel.create({
                id: input.id,
                title: input.title,
                description: input.description,
                tags: input.tags,
                cards: [CardModel.create({
                    title: input.cards[0].title,
                    sides: [CardSideModel.create({
                        content: [CardContentModel.create({
                            value: input.cards[0].sides[0].content[0].value,
                            type: input.cards[0].sides[0].content[0].type,
                            size: input.cards[0].sides[0].content[0].size,
                        })],
                    })],
                })],
            });
            await deckApi.update(deck);
            expect(graphqlOperation).toHaveBeenCalledWith(updateDeck, { input });
        });

        it("handles being passed UpdateDeckMutationVariables", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { updateDeck: createApiDeck() } })
            );
            const input = {
                title: "deck-title",
                description: "deck-description",
                tags: ["deck-tag"],
                cards: [{
                    title: "card-title",
                    sides: [{
                        content: [{
                            value: "content-value", type: CardSideContentType.Text, size: 0.5,
                        }],
                    }],
                }],
            };
            await deckApi.update({ input } as UpdateDeckMutationVariables);
            expect(graphqlOperation).toHaveBeenCalledWith(updateDeck, { input });
        });

        it("returns the Deck", async () => {
            const deck = createApiDeck({ id: "deck-id", title: "deck-title", ownerId: "owner-id" });
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { updateDeck: deck } })
            );
            const result = await deckApi.update(DeckModel.createFromApi(deck)).toPromise();
            expect(result).toBeInstanceOf(DeckModel);
            expect(result?.id).toBe(deck.id);
            expect(result?.title).toBe(deck.title);
            expect(result?.ownerId).toBe(deck.ownerId);
        });

        it("errors if no data", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({})
            );
            return expect(
                deckApi.update(DeckModel.createFromApi(createApiDeck())).toPromise()
            ).rejects.toThrow("Failed to parse deck");
        });

        it("errors on failure", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.error(new Error("test-error"))
            );
            return expect(
                deckApi.update(DeckModel.createFromApi(createApiDeck())).toPromise()
            ).rejects.toThrow("test-error");
        });

    });
    describe("#push", () => {

        it("updates existing decks", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { updateDeck: createApiDeck() } })
            );
            const spy = jest.spyOn(deckApi, "update");
            const deck = DeckModel.createFromApi(createApiDeck({ id: "text-deck" }));
            await deckApi.push(deck);
            expect(spy).toHaveBeenCalledWith(deck);
        });

        it("creates non-existing decks", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { createDeck: createApiDeck() } })
            );
            const spy = jest.spyOn(deckApi, "create");
            const deck = DeckModel.createFromApi(createApiDeck({ id: "" }));
            await deckApi.push(deck);
            expect(spy).toHaveBeenCalledWith(deck);
        });

    });
    describe("#remove", () => {

        it("returns the Deck", async () => {
            const id = "test-id", title = "test-title", ownerId = "test-ownerId";
            const deck = createApiDeck({ id, title, ownerId });
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { deleteDeck: deck } })
            );
            const result = await deckApi.remove("id").toPromise();
            expect(result).toBeInstanceOf(DeckModel);
            expect(result?.id).toBe(id);
            expect(result?.title).toBe(title);
            expect(result?.ownerId).toBe(ownerId);
        });

        it("errors if no data", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({})
            );
            return expect(
                deckApi.remove("id").toPromise()
            ).rejects.toThrow("Failed to parse deck");
        });

        it("errors on failure", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.error(new Error("test-error"))
            );
            return expect(
                deckApi.remove("id").toPromise()
            ).rejects.toThrow("test-error");
        });

    });

});
