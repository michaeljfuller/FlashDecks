import React from "react";
import {DeckModel} from "../../../models";

export interface DeckScreenHeaderProps {
    item: DeckModel;
    title?: string;
}
export interface DeckScreenHeaderPropsState {
    showInfo: boolean;
}

export default class DeckScreenHeaderBase extends React.Component<DeckScreenHeaderProps, DeckScreenHeaderPropsState>{
    state: DeckScreenHeaderPropsState = {
        showInfo: false,
    };

    get cardCount() {
        return this.props.item.cards?.length || 0;
    }

    openInfoModal = () => this.setState({ showInfo: true });
    closeInfoModal = () => this.setState({ showInfo: false });
}
