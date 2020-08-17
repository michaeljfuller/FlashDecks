import {ViewStyle} from "react-native";
import {CardModel} from "../../models";

export interface CardCarouselProps {
    cards?: CardModel[];
    style?: ViewStyle;
    editable?: boolean;
    onCardsChange?: CardCarouselDeckChange;
}
export type CardCarouselDeckChange = (cards: CardModel[]) => void;
