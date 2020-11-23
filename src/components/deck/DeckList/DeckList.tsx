import React from "react";
import {LayoutChangeEvent, View} from "react-native";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import DeckListItem, {listItemMaxWidth} from "./DeckListItem/DeckListItem";
import DeckListBase from "./DeckList.common";
import {DeckListItemModel} from "../../../models";
import {DeckListActionsMenu} from "./DeckListActionsMenu/DeckListActionsMenu";
import {castDraft} from "immer";

export interface DeckListState {
    /** The deck passed to the actions menu. */
    actionsDeck?: DeckListItemModel;
    /** Where to attach the actions menu. */
    actionsAnchor?: Element;
    /** Number of columns in the list. */
    columns: number;
}
export default class DeckList extends DeckListBase<DeckListState> {
    state: DeckListState = {
        columns: 0
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleActions = (deck: DeckListItemModel, event?: React.MouseEvent) => {
        const actionsAnchor = event?.nativeEvent.target as Element;
        this.setStateTo(draft => {
            draft.actionsDeck = castDraft(deck);
            draft.actionsAnchor = castDraft(actionsAnchor);
        });
    };
    handleCloseActions = () => {
        this.setStateTo({ actionsDeck: undefined, actionsAnchor: undefined });
    };
    handleScroll = () => this.handleCloseActions(); // On scroll, close the actions, since the Popover has `disableScrollLock={true}`.

    onLayout = (event: LayoutChangeEvent) => {
        this.setStateTo({ columns: Math.ceil(event.nativeEvent.layout.width / listItemMaxWidth) });
    };

    handleClick = (deck: DeckListItemModel) => this.gotToDeck(deck);
    handleEdit = (deck: DeckListItemModel) => this.editDeck(deck);
    handleDelete = (deck: DeckListItemModel) => this.deleteDeck(deck);

    render() {
        return <View onLayout={this.onLayout}>
            {this.renderGrid()}
            <DeckListActionsMenu
                deck={this.state.actionsDeck}
                anchor={this.state.actionsAnchor}
                onClose={this.handleCloseActions}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
            />
        </View>;
    }

    renderGrid() {
        if (this.state.columns < 0) return null; // Initial state, before onLayout

        const titles = this.props.decks.map(deck => {
            return <GridListTile key={deck.id}>
                <DeckListItem
                    deck={deck}
                    onClick={this.handleClick}
                    onActions={this.handleActions}
                    showActions={this.canShowActions(deck)}
                />
            </GridListTile>;
        });

        return <GridList cols={this.state.columns} cellHeight={245}>
            {titles}
        </GridList>;
    }
}
