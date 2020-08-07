import React, {useCallback, useState} from "react";
import {StyleSheet, View} from "react-native";
import Popover from '@material-ui/core/Popover';
import {withStyles} from "@material-ui/core/styles";

import {CardActionsProps} from "./CardSideActions.common";
import IconButton, {IconType} from "../../button/IconButton";

/** Action buttons for CardSide. */
export function CardSideActions(props: CardActionsProps) {
    const [actionsAnchor, setActionsAnchor] = useState<Element|undefined>();

    const openActions = useCallback((event?: React.MouseEvent) => {
        setActionsAnchor(event?.nativeEvent.target as Element);
    }, []);

    const closeActions = useCallback(() => {
        setActionsAnchor(undefined);
    }, []);

    let button: React.ReactElement;
    if (props.editing) {
        button = <IconButton key="done" icon={IconType.Done} onClick={props.onPressDone} color="Black" />;
    } else {
        button = <IconButton key="open" icon={IconType.More} onClick={openActions} color="Black" />;
    }
    return <View style={styles.root}>
        {button}
        <CardSideActionsMenu
            anchor={actionsAnchor}
            onClose={closeActions}
            onPressEdit={props.onPressEdit}
            onPressAddBefore={props.onPressAddBefore}
            onPressAddAfter={props.onPressAddAfter}
            onPressDelete={props.onPressDelete}
        />
    </View>;
}
export default CardSideActions;

export interface CardSideActionsMenuProps {
    anchor?: Element;
    onClose: () => void;
    onPressEdit: () => void;
    onPressAddBefore: () => void;
    onPressAddAfter: () => void;
    onPressDelete: () => void;
}
export function CardSideActionsMenu(props: CardSideActionsMenuProps) {
    const onPressEdit = useCallback(() => {
        props.onClose();
        props.onPressEdit();
    }, [props.onPressEdit]);

    const onPressDelete = useCallback(() => {
        props.onClose();
        props.onPressDelete();
    }, [props.onPressDelete]);

    const onPressAddBefore = useCallback(() => {
        props.onClose();
        props.onPressAddBefore();
    }, [props.onPressAddBefore]);

    const onPressAddAfter = useCallback(() => {
        props.onClose();
        props.onPressAddAfter();
    }, [props.onPressAddAfter]);

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
                <IconButton text="Edit" icon={IconType.Edit} onClick={onPressEdit} />
            </View>
            <View style={{ paddingTop: 5 }}>
                <IconButton text="Add Before" icon={IconType.Add} onClick={onPressAddBefore} />
            </View>
            <View style={{ paddingTop: 5 }}>
                <IconButton text="Add After" icon={IconType.Add} onClick={onPressAddAfter} />
            </View>
            <View style={{ paddingTop: 5 }}>
                <IconButton text="Delete" icon={IconType.Delete} onClick={onPressDelete} />
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

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        right: 5,
    },
});
