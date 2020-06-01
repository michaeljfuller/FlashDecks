import React from "react";

export interface DeckListItemProps {
    /** The deck to be represented. */
    deck: Deck;
    /** If the actions button should be shown. */
    showActions?: boolean;
    /** Callback for when the Deck is clicked. */
    onClick?: (deck: Deck, event?: React.MouseEvent) => void;
    /** Callback for when the actions button is clicked. */
    onActions?: (deck: Deck, event?: React.MouseEvent) => void;
}
