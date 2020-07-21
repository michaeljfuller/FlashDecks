import {ViewStyle} from "react-native";

export interface CardCarouselProps {
    cards?: Card[];
    style?: ViewStyle;
    editable?: boolean;
    onDeckChange?: CardCarouselDeckChange;
}
export type CardCarouselDeckChange = (item: Deck) => void;
