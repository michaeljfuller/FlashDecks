import {ViewStyle} from "react-native";
import {CardModel} from "../../models";
import {fitAspectRatio} from "../../utils/math";

export interface CardCarouselProps {
    cards?: CardModel[];
    style?: ViewStyle;
    editable?: boolean;
    onCardsChange?: CardCarouselDeckChange;
    onScrollCards?: CardCarouselScrollCards;
}
export type CardCarouselDeckChange = (cards: CardModel[]) => void;
export type CardCarouselScrollCards = (index: number) => void;

export const cardAspectRatio = 0.7;

/** Resize the card to conform to the aspect ratio. */
export function resizeCard(
    width: number,
    height: number,
    cardMargin = 10,
    minSize = 100
) {
    width -= cardMargin * 2;
    height -= cardMargin * 2;

    width = Math.max(width, minSize);
    height = Math.max(height, minSize);

    return fitAspectRatio(width, height, cardAspectRatio);
}
