import {Image} from "react-native";

/**
 * Preload the media on the cards.
 * @param {Card[]} cards
 */
export async function preloadCards(cards: Card[]): Promise<any> {
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
export async function preloadCard(card: Card): Promise<any> {
    const contents = (card.sides||[]).map(side => side.content).flat();
    const promises: Promise<any>[] = contents.map(content => {
        switch (content.type) {
            case 'Image': return Image.prefetch(content.value);
            case 'Video': return; // TODO Thumbnail
        }
    }).filter(v => v);

    return Promise.all(
        promises.map(
            promise => promise.catch((error) => error) // Catch errors, rather than fail
        )
    );
}
