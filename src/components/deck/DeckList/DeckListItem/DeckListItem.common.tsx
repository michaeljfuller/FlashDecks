import React from "react";
import {DeckListItemModel} from "../../../../models";

export interface DeckListItemProps {
    /** The deck to be represented. */
    deck: DeckListItemModel;
    /** If the actions button should be shown. */
    showActions?: boolean;
    /** Callback for when the Deck is clicked. */
    onClick?: (deck: DeckListItemModel, event?: React.MouseEvent) => void;
    /** Callback for when the actions button is clicked. */
    onActions?: (deck: DeckListItemModel, event?: React.MouseEvent) => void;
}
