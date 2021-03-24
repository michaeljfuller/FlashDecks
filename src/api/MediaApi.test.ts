//<editor-fold desc="Mocks">

import {Storage as _Storage} from "aws-amplify";
import {MockStorage, mockStorageMethods} from "../../__mocks__/aws-amplify/MockStorage";

jest.mock("aws-amplify");
const Storage: MockStorage = _Storage as any;

jest.mock("../utils/Logger");

//</editor-fold>
//<editor-fold desc="Imports">

import {castDraft} from "immer";
import {MediaApi} from "./MediaApi";
import {CardModel, CardSideModel, CardContentModel, DeckModel} from "../models";
import {repeat} from "../utils/array";

//</editor-fold>
//<editor-fold desc="Helpers">

type ContentData = Parameters<typeof CardContentModel.create>[0]
function createMediaDeck(
    contentPerSide: Partial<ContentData>[],
    numCards = 2,
    numSidesPerCard = 2
) {
    return DeckModel.create({
        cards: repeat(numCards, (cardIndex) => CardModel.create({
            title: `card-${cardIndex+1}`,
            sides: repeat(numSidesPerCard, (sideIndex) => CardSideModel.create({
                content: contentPerSide.map((data, contentIndex) => CardContentModel.create(
                    Object.assign(
                        { value: `${cardIndex}-${sideIndex}-${contentIndex}`, type: "Text", format: "String" },
                        data
                    ) as ContentData
                )),
            })),
        })),
    });
}

function createDataUri(type="image/png", base64 = true, data="MockFileData") {
    return `data:${type};${base64 ? "base64," : ''}${data}`; // data:image/png;base64,MockFileData
}

//</editor-fold>

describe("MediaApi", () => {
    let api: MediaApi;
    beforeEach(() => api = new MediaApi());
    afterEach(() => Storage.mocks.resetAll());

    const anyKey = expect.any(String);
    const progressCallback = expect.any(Function)

    describe("#uploadFromDeck", () => {

        it("uploads content for each deck media", async () => {
            Storage.put.mockImplementation(mockStorageMethods.put.resolve({ key: "test-key" }));
            const cards = 3;
            const sidesPerCard = 2;
            const contentPerSide: Parameters<typeof createMediaDeck>[0] = [
                { type: "Text",  format: "String" }, // 0
                { type: "Image", format: "S3Key"  }, // 1
                { type: "Image", format: "ImageData", value: createDataUri("image/png", false) }, // 2
                { type: "Video", format: "VideoData", value: createDataUri("video/mp4", true)  }, // 3
                { type: "Video", format: "S3Key"  }, // 4
                { type: "Link",  format: "String" }, // 5
            ];
            const contentToUpload = cards * sidesPerCard * 2;
            const deck = createMediaDeck(contentPerSide, cards, sidesPerCard);
            const imageFile = deck.cards[0].sides[0].content[2].asFile();
            const videoFile = deck.cards[0].sides[0].content[3].asFile();

            await api.uploadFromDeck(deck).toPromise();
            expect(Storage.put).toBeCalledTimes(contentToUpload);
            expect(Storage.put).toHaveBeenNthCalledWith(
                1, anyKey, imageFile, { contentType: "image/png", progressCallback }
            );
            expect(Storage.put).toHaveBeenNthCalledWith(
                2, anyKey, videoFile, { contentType: "video/mp4", progressCallback }
            );
        });

        it("returns an updated deck", async () => {
            Storage.put.mockImplementation(mockStorageMethods.put.resolve({ key: "test-key" }));
            const cards = 3;
            const sidesPerCard = 2;
            const contentPerSide: Parameters<typeof createMediaDeck>[0] = [
                { type: "Text",  format: "String" }, // 0
                { type: "Image", format: "S3Key"  }, // 1
                { type: "Image", format: "ImageData", value: createDataUri("image/png", false) }, // 2
                { type: "Video", format: "VideoData", value: createDataUri("video/mp4", true)  }, // 3
                { type: "Video", format: "S3Key"  }, // 4
                { type: "Link",  format: "String" }, // 5
            ];
            const contentToUpload = cards * sidesPerCard * 2;
            const deck = createMediaDeck(contentPerSide, cards, sidesPerCard);

            const result = await api.uploadFromDeck(deck).toPromise();
            expect(result.deck).toEqual(deck.update(
                draftDeck => {
                    draftDeck.cards = castDraft(
                        draftDeck.cards.map(
                            card => card.update(
                                draftCard => draftCard.sides = draftCard.sides.map(
                                    side => side.update(
                                        draftSide => draftSide.content = draftSide.content.map(
                                            content => content.update({
                                                format: expect.not.stringContaining("Data"),
                                                value: expect.not.stringContaining("data:"),
                                            }, false)
                                        ), false
                                    )
                                ), false
                            )
                        )
                    )
                }, false
            ));
            expect(result.currentIndex).toEqual(expect.any(Number));
            expect(result.contentList).toHaveLength(contentToUpload);
        });

        it("handles put error", () => {
            Storage.put.mockImplementation(mockStorageMethods.put.reject(new Error("test-error")));
            const request = api.uploadFromDeck(createMediaDeck([
                { type: "Image", format: "ImageData", value: createDataUri() }
            ]));
            return expect(request.toPromise()).rejects.toThrow("test-error");
        });
        it("handles get error", () => {
            Storage.put.mockImplementation(mockStorageMethods.put.resolve({ key: "test-key" }));
            Storage.get.mockImplementation(mockStorageMethods.get.reject(new Error("test-error")));
            const request = api.uploadFromDeck(createMediaDeck([
                { type: "Image", format: "ImageData", value: createDataUri() }
            ]));
            return expect(request.toPromise()).rejects.toThrow("test-error");
        });

    });

    describe("#uploadFile", () => {
        const contentType = "image/png", url = "test-url";
        const file = CardContentModel.create({
            value: createDataUri(contentType), format: "ImageData"
        }).asFile() as Blob;

        it("uploads a file", async () => {
            Storage.put.mockImplementation(mockStorageMethods.put.resolve({ key: "test-key" }));
            Storage.get.mockImplementation(mockStorageMethods.get.resolve(url));

            const result = await api.uploadFile(file);
            expect(Storage.put).toHaveBeenCalledWith(anyKey, file, { contentType });
            expect(result).toEqual({ url, key: anyKey, contentType });
        });


        it("handles put error", () => {
            Storage.put.mockImplementation(mockStorageMethods.put.reject(new Error("test-error")));
            return expect(api.uploadFile(file)).rejects.toThrow("test-error");
        });
        it("handles get error", () => {
            Storage.put.mockImplementation(mockStorageMethods.put.resolve({ key: "test-key" }));
            Storage.get.mockImplementation(mockStorageMethods.get.reject(new Error("test-error")));
            return expect(api.uploadFile(file)).rejects.toThrow("test-error");
        });

    });

    describe("#fetchMediaUrl", () => {

        it("gets the file's url", async () => {
            const url = "test-url";
            Storage.get.mockImplementation(mockStorageMethods.get.resolve(url));
            const result = await api.fetchMediaUrl("test-key").toPromise();
            expect(result).toBe(url);
        });

        it("handles error", () => {
            Storage.get.mockImplementation(mockStorageMethods.get.reject(new Error("test-error")));
            return expect(api.fetchMediaUrl("test-key").toPromise()).rejects.toThrow("test-error");
        });

    });

});
