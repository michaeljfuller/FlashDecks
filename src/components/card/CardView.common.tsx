import React from "react";

export interface CardViewProps {
    item: Card;
}

export default class CardViewBase<State = {}> extends React.Component<CardViewProps, State>{
}
