import React from "react";
import {DeckModel} from "../../../models";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";

export interface DeckScreenHeaderProps {
    item: DeckModel;
    title?: string;
    saveText?: string;
    editable?: boolean;
    disabled?: boolean;
    onOpenInfoModal?: () => void;
    onOpenHelpModal?: () => void;
    onAddCard?: () => void;
    onRemoveCard?: () => void;
    onSave?: () => void;
    onUndo?: () => void;
}

export default class DeckScreenHeaderBase<State=any> extends ImmutablePureComponent<DeckScreenHeaderProps, State>{
    get disabled() {
        return Boolean(this.props.disabled);
    }
    get cardCount() {
        return this.props.item.cards?.length || 0;
    }
}
