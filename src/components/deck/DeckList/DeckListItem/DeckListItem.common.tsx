import React from "react";
import {DeckModel} from "../../../../models";

export interface DeckListItemProps {
    /** The deck to be represented. */
    deck: DeckModel;
    /** If the actions button should be shown. */
    showActions?: boolean;
    /** Callback for when the Deck is clicked. */
    onClick?: (deck: DeckModel, event?: React.MouseEvent) => void;
    /** Callback for when the actions button is clicked. */
    onActions?: (deck: DeckModel, event?: React.MouseEvent) => void;
}
