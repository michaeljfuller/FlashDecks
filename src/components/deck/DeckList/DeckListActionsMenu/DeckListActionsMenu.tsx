import React from "react";
import {View} from "react-native";

import Popover from '@material-ui/core/Popover';
import {withStyles} from "@material-ui/core/styles";

import {IconType} from "../../../icon/Icon.common";
import IconButton from "../../../button/IconButton";
import {DeckModel} from "../../../../models";

export interface DeckListActionsMenuProps {
    deck?: DeckModel;
    anchor?: Element;
    onClose: () => void;
    onEdit: (deck: DeckModel) => void;
    onDelete: (deck: DeckModel) => void;
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
