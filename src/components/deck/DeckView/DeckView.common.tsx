import React from "react";
import {DeckModel} from "../../../models";

export interface DeckViewProps {
    item: DeckModel;
    editable?: boolean;
    onItemChange?: DeckViewItemChange;
}
export type DeckViewItemChange = (item: DeckModel) => void;

export default class DeckViewBase<State = {}> extends React.Component<DeckViewProps, State>{
    get cardCount() {
        return this.props.item.cards?.length || 0;
    }
}
