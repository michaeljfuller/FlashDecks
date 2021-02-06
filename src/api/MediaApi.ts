import {Observable} from "rxjs";
import {CardContentModel, DeckModel} from "../models";
import ApiRequest from "./util/ApiRequest";
import {logClass} from "../utils/debugging/decorators/logClass";
import s3, {StoragePutProgress, StoragePutProgressCallback} from "./MediaApi.s3";

@logClass({ enabled: true })
export class MediaApi {

    /** Get files from content, upload them, and return an updated deck. */
    uploadFromDeck(deck: DeckModel): ApiRequest<UploadingContent, DeckModel> {
        const observable = new Observable<UploadingContent>(subscribe => {

            const contentList = getDeckContentToUpload(deck);
            let value: UploadingContent = { deck, contentList, currentIndex: 0 };
            subscribe.next(value);

            // Asynchronous recursive function to upload content one at a time
            const uploadNext = (
                contentIndex: number,
                updatedDeck: DeckModel
            ): void => {
                // If exhausted the list, update the deck and complete.
                if (contentIndex >= contentList.length) {
                    subscribe.next(value = { ...value, deck: updatedDeck });
                    return subscribe.complete();
                }

                // Update progress
                subscribe.next(value = { ...value, deck: updatedDeck, currentIndex: contentIndex });

                // Upload the next item
                const currentContent = contentList[contentIndex];
                this.uploadFile(
                    currentContent.file,
                    (currentProgress: StoragePutProgress) => subscribe.next(value = {...value, currentProgress})
                ).then(
                    (uploadResult: UploadMediaFileResult) => {
                        // On upload, replace the value and format with the S3Key.
                        updatedDeck = updatedDeck.update(draft => {
                            const {cardIndex, sideIndex, contentIndex} = currentContent;
                            draft.cards[cardIndex].sides[sideIndex].content[contentIndex].value = uploadResult.key;
                            draft.cards[cardIndex].sides[sideIndex].content[contentIndex].format = "S3Key";
                        });
                        uploadNext(contentIndex+1, updatedDeck); // Next item
                    }
                )

            };

            uploadNext(0, deck); // Kick off the process
        });

        return new ApiRequest(observable, deck);
    }

    /**
     * Uploads file, returning the URL.
     * @TODO Add intermediate REST API with validation & unique key generation, rather than directly to S3.
     * @link https://docs.amplify.aws/lib/storage/upload/q/platform/js
     */
    async uploadFile(
        file: Blob,
        progressCallback?: StoragePutProgressCallback,
        key = CardContentModel.generateKey(),
    ): Promise<UploadMediaFileResult> {
        const contentType = file.type;
        await s3.put(key, file, { contentType, progressCallback });
        const url = await s3.get(key);
        return { url, key, contentType };
    }

    /**
     * @link https://docs.amplify.aws/lib/storage/download/q/platform/js
     */
    // downloadFile(key: string) {
    //     return new ApiRequest<GetObjectOutput<Blob>>(
    //         s3.get(key, { download: true }),
    //         { key, download: true }
    //     );
    // }

    /**
     * @link https://docs.amplify.aws/lib/storage/download/q/platform/js
     */
    fetchMediaUrl(key: string) {
        return new ApiRequest<string>(
            s3.get(key, { download: false }),
            { key, download: false }
        );
    }

}

const mediaApi = new MediaApi();
export default mediaApi;

/** Get a list of content files to be uploaded, and their position in the deck. */
function getDeckContentToUpload(deck: DeckModel): ContentToUpload[] {
    const result: ContentToUpload[] = [];
    deck.cards.forEach((card, cardIndex) => {
        card.sides.forEach((side, sideIndex) => {
            side.content.forEach((content, contentIndex) => {
                const file = content.asFile();
                if (file) result.push({ file, cardIndex, sideIndex, contentIndex });
            });
        });
    });
    return result;
}

export interface UploadMediaFileResult {
    url: string;
    key: string;
    contentType: string;
}

export interface ContentToUpload {
    file: Blob;
    cardIndex: number;
    sideIndex: number;
    contentIndex: number;
}

export interface UploadingContent {
    deck: DeckModel;
    contentList: ContentToUpload[];
    currentIndex: number;
    currentProgress?: StoragePutProgress; // TODO Show in CardEditScreen
}
