import React from "react";

export interface DeckViewProps {
    item: Deck;
}

export default class DeckViewBase<State = {}> extends React.Component<DeckViewProps, State>{
}
