import {ViewStyle} from "react-native";
import {CardModel, DeckModel} from "../../models";

export interface CardCarouselProps {
    cards?: CardModel[];
    style?: ViewStyle;
    editable?: boolean;
    onDeckChange?: CardCarouselDeckChange;
}
export type CardCarouselDeckChange = (item: DeckModel) => void;
