import React from "react";
import {View} from "react-native";

import Popover from '@material-ui/core/Popover';
import {withStyles} from "@material-ui/core/styles";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import {IconType} from "../icon/Icon.common";
import IconButton from "../button/IconButton";
import DeckListItem from "./DeckListItem";
import DeckListBase from "./DeckList.common";

export interface DeckListState {
    /** The deck passed to the actions menu. */
    actionsDeck?: Deck;
    /** Where to attach the actions menu. */
    actionsAnchor?: Element;
}
export default class DeckList extends DeckListBase<DeckListState> {
    state: DeckListState = {};

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleActions = (deck: Deck, event: React.MouseEvent) => {
        this.setState({ actionsDeck: deck, actionsAnchor: event.nativeEvent.target as Element });
    };
    handleCloseActions = () => {
        this.setState({ actionsDeck: undefined, actionsAnchor: undefined });
    };
    handleScroll = () => this.handleCloseActions(); // On scroll, close the actions, since the Popover has `disableScrollLock={true}`.

    handleClick = (deck: Deck) => this.gotToDeck(deck);
    handleEdit = (deck: Deck) => this.editDeck(deck);
    handleDelete = (deck: Deck) => this.deleteDeck(deck);

    render() {
        return <View>
            <GridList
                cols={3}
                cellHeight={245}
            >
                {this.props.decks.map(deck => <GridListTile key={deck.id}>
                    <DeckListItem
                        deck={deck}
                        onClick={this.handleClick}
                        onActions={this.handleActions}
                        showActions={this.canShowActions(deck)}
                    />
                </GridListTile>)}
            </GridList>

            <DeckListActionsMenu
                deck={this.state.actionsDeck}
                anchor={this.state.actionsAnchor}
                onClose={this.handleCloseActions}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
            />
        </View>;
    }
}

export interface DeckListActionsMenuProps {
    deck?: Deck;
    anchor?: Element;
    onClose: () => void;
    onEdit: (deck: Deck) => void;
    onDelete: (deck: Deck) => void;
}

/**
 * The menu that opens when you click the menu button.
 */
export function DeckListActionsMenu(props: DeckListActionsMenuProps){
    const onEdit = () => {
        props.onClose();
        if (props.deck) props.onEdit(props.deck);
    };
    const onDelete = () => {
        props.onClose();
        if (props.deck) props.onDelete(props.deck);
    };
    return <StyledPopover
        open={!!props.anchor}
        onClose={props.onClose}
        onBackdropClick={props.onClose}
        anchorEl={props.anchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        disableScrollLock={true}
    >
        <View style={{
            flexDirection: 'column'
        }}>
            <View>
                <IconButton text="Edit" icon={IconType.Edit} onClick={onEdit} />
            </View>
            <View style={{ paddingTop: 5 }}>
                <IconButton text="Delete" icon={IconType.Delete} onClick={onDelete} />
            </View>
        </View>
    </StyledPopover>
}

const StyledPopover = withStyles({
    root: {
        marginTop: 5
    },
    paper: {
        minWidth: 100,
        padding: 5
    }
})(Popover) as typeof Popover;
