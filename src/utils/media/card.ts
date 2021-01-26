import {preloadImage} from "./image";
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
            case 'Image': return preloadCardImage(content);
            case 'Video': return; // TODO Thumbnail/placeholder?
        }
    }).filter(v => v) as Promise<any>[];

    return Promise.all(
        promises.map(
            promise => promise.catch(() => {}) // Catch errors, rather than fail
        )
    );
}

async function preloadCardImage(content: CardContentModel) {
    if (content.format === "S3Key") {
        try {
            const {payload} = await mediaApi.fetchMediaUrl(content.value).wait();
            return payload ? preloadImage(payload, content.value) : null;
        } catch (e) {
            console.warn('preloadCardImage', e);
            return;
        }
    }
    return preloadImage(content.value);
}
