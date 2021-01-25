import {BehaviorSubject, Observable} from "rxjs";
import {CardContentModel, DeckModel} from "../models";
import ApiRequest from "./util/ApiRequest";
import {logClass} from "../utils/debugging/decorators/logClass";
import s3, {StoragePutProgress, StoragePutProgressCallback} from "./MediaApi.s3";

export interface UploadMediaFileResult {
    url: string;
    key: string;
    contentType: string;
}

@logClass({ enabled: true })
export class MediaApi {

    /** Get files from content, upload them, and return an updated deck. */
    uploadFromDeck(deck: DeckModel): Observable<UploadingContent> {
        const list = getDeckContentToUpload(deck);
        const result = new BehaviorSubject<UploadingContent>({deck, list, currentIndex: 0});

        const progressCallback = (currentProgress: StoragePutProgress) => {
            result.next({ ...result.getValue(), currentProgress });
        };

        // Recursive function, uploading one item at a time, and replacing its value on the deck with the URL.
        const uploadNext = (index: number, currentDeck: DeckModel) => {
            const current = list[index];
            if (current) {
                const request = new ApiRequest<UploadMediaFileResult, ContentToUpload>(
                    this.uploadFile(current.file, progressCallback).then(
                        uploadResult => {
                            const {key} = uploadResult;
                            currentDeck = currentDeck.update(draft => {
                                const {cardIndex, sideIndex, contentIndex} = current;
                                draft.cards[cardIndex].sides[sideIndex].content[contentIndex].value = key;
                                draft.cards[cardIndex].sides[sideIndex].content[contentIndex].format = "S3Key";
                            });
                            result.next({ deck: currentDeck, list, currentIndex: index, request });

                            uploadNext(index+1, currentDeck);
                            return uploadResult;
                        }
                    ),
                    current
                );
            } else {
                result.next({ ...result.getValue(), request: undefined });
                result.complete();
            }
        };

        uploadNext(0, deck);
        return result.asObservable();
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

interface ContentToUpload {
    file: Blob;
    cardIndex: number;
    sideIndex: number;
    contentIndex: number;
}

interface UploadingContent {
    deck: DeckModel;
    list: ContentToUpload[];
    currentIndex: number;
    currentProgress?: StoragePutProgress; // TODO Show in CardEditScreen
    request?: ApiRequest<UploadMediaFileResult, ContentToUpload>;
}
