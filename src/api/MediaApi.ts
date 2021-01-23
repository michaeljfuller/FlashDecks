import {v4 as uuid} from "uuid";
import {BehaviorSubject, Observable} from "rxjs";
import {DeckModel} from "../models";
import ApiRequest from "./util/ApiRequest";
import {logClass} from "../utils/debugging/decorators/logClass";
import s3 from "./MediaApi.s3";

@logClass({ enabled: true })
export class MediaApi {

    /** Get files from content, upload them, and return an updated deck. */
    uploadFromDeck(deck: DeckModel): Observable<UploadingContent> {
        const list = getDeckContentToUpload(deck);
        const result = new BehaviorSubject<UploadingContent>({deck, list, currentIndex: 0});

        // Recursive function, uploading one item at a time, and replacing its value on the deck with the URL.
        const uploadNext = (index: number, currentDeck: DeckModel) => {
            const current = list[index];
            if (current) {
                const request = new ApiRequest<string, ContentToUpload>(
                    this.uploadFile(current.file).then(
                        url => {
                            currentDeck = currentDeck.update(draft => {
                                const {cardIndex, sideIndex, contentIndex} = current;
                                draft.cards[cardIndex].sides[sideIndex].content[contentIndex].value = url;
                                draft.cards[cardIndex].sides[sideIndex].content[contentIndex].format = "String";
                            });
                            result.next({ deck: currentDeck, list, currentIndex: index, request });

                            uploadNext(index+1, currentDeck);
                            return url;
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
     */
    async uploadFile(file: Blob, key: string = 'media/'+uuid()): Promise<string> {
        await s3.put(key, file, { contentType: file.type });
        return await s3.get(key);
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
    request?: ApiRequest<string, ContentToUpload>;
}
