import React from "react";
import {DeckModel} from "../../../models";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";

export interface DeckScreenHeaderProps {
    item: DeckModel;
    title?: string;
    editable?: boolean;
    onOpenInfoModal?: () => void;
    onAddCard?: () => void;
    onRemoveCard?: () => void;
}
export interface DeckScreenHeaderPropsState {
    showInfo: boolean;
}

export default class DeckScreenHeaderBase extends ImmutablePureComponent<DeckScreenHeaderProps, DeckScreenHeaderPropsState>{
    state: DeckScreenHeaderPropsState = {
        showInfo: false,
    };

    get cardCount() {
        return this.props.item.cards?.length || 0;
    }
}
