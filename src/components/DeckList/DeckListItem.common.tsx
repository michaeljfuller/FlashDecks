import React from "react";

export interface DeckListItemProps {
    deck: Deck;
    showActions?: boolean;
    onClick?: (deck: Deck) => void;
    onEdit?: (deck: Deck) => void;
    onView?: (deck: Deck) => void;
}
