import React from "react";

export interface DeckListItemProps {
    deck: Deck;
    showActions?: boolean;
    onClick?: (deck: Deck, event: React.MouseEvent) => void;
    onActions?: (deck: Deck, event: React.MouseEvent) => void;
}
