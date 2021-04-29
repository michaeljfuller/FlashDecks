import React, {useCallback, useState} from "react";
import {StyleSheet, View} from "react-native";
import Popover from '@material-ui/core/Popover';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

import {CardContentActionsProps} from "./CardContentActions.common";
import Button, {IconType} from "../../button/Button";
import IconButton from "../../button/IconButton";

/** Action buttons for CardContent. */
export const CardContentActions = React.memo(function CardContentActions(props: CardContentActionsProps) {
    const [actionsAnchor, setActionsAnchor] = useState<Element|undefined>();

    const openActions = useCallback((event?: React.MouseEvent) => {
        setActionsAnchor(event?.nativeEvent.target as Element);
    }, [setActionsAnchor]);

    const closeActions = useCallback(() => {
        setActionsAnchor(undefined);
    }, [setActionsAnchor]);

    const buttons = [] as React.ReactElement[];
    if (props.resizing) {
        buttons.push(<IconButton key="done" icon={IconType.Done} onClick={props.onPressDone} color="Black" />);
    } else {
        buttons.push(<IconButton key="open" icon={IconType.More} onClick={openActions} color="Black" />);
    }
    return <View style={styles.root}>
        {buttons}
        <CardContentActionsMenu
            anchor={actionsAnchor}
            onClose={closeActions}
            onPressEdit={props.onPressEdit}
            onPressAddBefore={props.onPressAddBefore}
            onPressAddAfter={props.onPressAddAfter}
            onPressDelete={props.onPressDelete}
            onPressResize={props.onPressResize}
        />
    </View>;
});
export default CardContentActions;

export interface CardContentActionsMenuProps {
    anchor?: Element;
    onClose: () => void;
    onPressEdit: () => void;
    onPressAddBefore: () => void;
    onPressAddAfter: () => void;
    onPressResize: () => void;
    onPressDelete: () => void;
}
export function CardContentActionsMenu(props: CardContentActionsMenuProps) {
    const {
        onClose: _onClose,
        onPressEdit: _onPressEdit,
        onPressResize: _onPressResize,
        onPressDelete: _onPressDelete,
        onPressAddBefore: _onPressAddBefore,
        onPressAddAfter: _onPressAddAfter,
    } = props;

    const onPressEdit = useCallback(() => {
        _onClose(); _onPressEdit();
    }, [_onClose, _onPressEdit]);

    const onPressResize = useCallback(() => {
        _onClose(); _onPressResize();
    }, [_onClose, _onPressResize]);

    const onPressDelete = useCallback(() => {
        _onClose(); _onPressDelete();
    }, [_onClose, _onPressDelete]);

    const onPressAddBefore = useCallback(() => {
        _onClose(); _onPressAddBefore();
    }, [_onClose, _onPressAddBefore]);

    const onPressAddAfter = useCallback(() => {
        _onClose(); _onPressAddAfter();
    }, [_onClose, _onPressAddAfter]);

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
            <Typography align="center">Card Content</Typography>
            <Button square title="Edit Content"     icon={IconType.Edit}   onClick={onPressEdit} />
            <Button square title="Resize Content"   icon={IconType.Resize} onClick={onPressResize}    style={styles.paddedButton} />
            <Button square title="Add Before"       icon={IconType.Add}    onClick={onPressAddBefore} style={styles.paddedButton} />
            <Button square title="Add After"        icon={IconType.Add}    onClick={onPressAddAfter}  style={styles.paddedButton} />
            <Button square title="Delete Content"   icon={IconType.Delete} onClick={onPressDelete}    style={styles.paddedButton} />
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
    },
})(Popover) as typeof Popover;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        right: 5,
    },
    column: {
        flexDirection: 'column',
    },
    paddedButton: {
        paddingTop: 5,
    },
});
