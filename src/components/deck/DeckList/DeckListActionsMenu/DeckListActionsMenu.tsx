import React from "react";
import {View, StyleSheet} from "react-native";

import Popover from '@material-ui/core/Popover';
import {withStyles} from "@material-ui/core/styles";

import {IconType} from "../../../icon/Icon.common";
import IconButton from "../../../button/IconButton";
import {DeckListItemModel} from "../../../../models";

export interface DeckListActionsMenuProps {
    deck?: DeckListItemModel;
    anchor?: Element;
    onClose: () => void;
    onEdit: (deck: DeckListItemModel) => void;
    onDelete: (deck: DeckListItemModel) => void;
}

/**
 * The menu that opens when you click the menu button.
 */
export const DeckListActionsMenu = React.memo(function DeckListActionsMenu(props: DeckListActionsMenuProps){
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
        <View style={styles.column}>
            <IconButton text="Edit" icon={IconType.Edit} onClick={onEdit} />
            <IconButton text="Delete" icon={IconType.Delete} onClick={onDelete} style={styles.paddedButton} />
        </View>
    </StyledPopover>
});
export default DeckListActionsMenu;

const StyledPopover = withStyles({
    root: {
        marginTop: 5
    },
    paper: {
        minWidth: 100,
        padding: 5
    }
})(Popover) as typeof Popover;

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
    },
    paddedButton: {
        paddingTop: 5,
    },
});
