import React from "react";
import {CardModel, DeckModel} from "../../../models";
import ImmutablePureComponent, {castDraft} from "../../../components/ImmutablePureComponent";

export interface DeckScreenHeaderProps {
    item: DeckModel;
    title?: string;
    editable?: boolean;
    onChange?: (item: DeckModel) => void;
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
    addCard = () => {
        if (this.props.onChange && this.props.item) {
            this.props.onChange(this.props.item.update(draft => {
                const card = castDraft(new CardModel());
                draft.cards.push(card);
            }));
        }
    };
}
