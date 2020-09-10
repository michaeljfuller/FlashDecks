import React from "react";
import {DeckModel} from "../../../models";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";

export interface DeckScreenHeaderProps {
    item: DeckModel;
    title?: string;
    editable?: boolean;
    onChange?: (item: DeckModel) => void;
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

    openInfoModal = () => this.setStateTo({ showInfo: true });
    closeInfoModal = () => this.setStateTo({ showInfo: false });
}
