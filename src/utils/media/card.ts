import {Observable} from "rxjs";
import {ImageSize, preloadImage} from "./image";
import {CardContentModel, CardModel} from "../../models";
import mediaApi from "../../api/MediaApi";

/**
 * Preload the media on the cards.
 * @param {Card[]} cards
 */
export async function preloadCards(cards: CardModel[]): Promise<void> {
    if (cards.length) {
        const [current, ...next] = cards;
        await preloadCard(current);
        await preloadCards(next); // Move onto the next
    }
}

/**
 * Preload the media on a card.
 * @param {Card} card
 */
export async function preloadCard(card: CardModel): Promise<any> {
    const contents = (card.sides||[]).map(side => side.content).flat();
    const promises: Promise<any>[] = contents.map(content => {
        switch (content.type) {
            case 'Image': return preloadCardImage(content).toPromise();
            case 'Video': return; // TODO Thumbnail/placeholder?
        }
    }).filter(v => v) as Promise<any>[];

    return Promise.all(
        promises.map(
            promise => promise.catch(() => {}) // Catch errors, rather than fail
        )
    );
}

/** Preload a single CardContentModel image. */
function preloadCardImage(content: CardContentModel): Observable<ImageSize> {
    if (content.format === "S3Key") {
        return new Observable<ImageSize>(subscriber => {
            mediaApi.fetchMediaUrl(content.value).toPromise().then(
                uri => preloadImage(uri, content.value).subscribe(subscriber),
                error => subscriber.error(error),
            );
        });
    }
    return preloadImage(content.value);
}
