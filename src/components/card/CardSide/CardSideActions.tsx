import React, {useCallback, useState} from "react";
import {StyleSheet, View} from "react-native";
import Popover from '@material-ui/core/Popover';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

import {CardActionsProps} from "./CardSideActions.common";
import Button, {IconType} from "../../button/Button";
import IconButton from "../../button/IconButton";

/** Action buttons for CardSide. */
export const CardSideActions = React.memo(function CardSideActions(props: CardActionsProps) {
    const [actionsAnchor, setActionsAnchor] = useState<Element|undefined>();

    const openActions = useCallback((event?: React.MouseEvent) => {
        setActionsAnchor(event?.nativeEvent.target as Element);
    }, []);

    const closeActions = useCallback(() => {
        setActionsAnchor(undefined);
    }, []);

    let button: React.ReactElement;
    if (props.editing) {
        button = <React.Fragment>
            <IconButton icon={IconType.Done}   onClick={props.onPressDone}   disabled={props.disabled} color={props.onPressDone ? "Green" : "Grey"} />
            <IconButton icon={IconType.Cancel} onClick={props.onPressCancel} disabled={props.disabled} color="Red" />
        </React.Fragment>;
    } else {
        button = <IconButton icon={IconType.More} onClick={openActions} disabled={props.disabled} color="Black" />;
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
});
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
    const {
        onClose: _onClose,
        onPressEdit: _onPressEdit,
        onPressDelete: _onPressDelete,
        onPressAddBefore: _onPressAddBefore,
        onPressAddAfter: _onPressAddAfter,
    } = props;
    const onPressEdit = useCallback(() => {
        _onClose();
        _onPressEdit();
    }, [_onClose, _onPressEdit]);

    const onPressDelete = useCallback(() => {
        _onClose();
        _onPressDelete();
    }, [_onClose, _onPressDelete]);

    const onPressAddBefore = useCallback(() => {
        _onClose();
        _onPressAddBefore();
    }, [_onClose, _onPressAddBefore]);

    const onPressAddAfter = useCallback(() => {
        _onClose();
        _onPressAddAfter();
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
            <Typography align="center">Card Side</Typography>
            <Button square title="Edit Side"    icon={IconType.Edit}   onClick={onPressEdit}  />
            <Button square title="Add Before"   icon={IconType.Add}    onClick={onPressAddBefore} style={styles.paddedButton} />
            <Button square title="Add After"    icon={IconType.Add}    onClick={onPressAddAfter}  style={styles.paddedButton} />
            <Button square title="Delete Side"  icon={IconType.Delete} onClick={onPressDelete}    style={styles.paddedButton} />
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
    column: {
        flexDirection: 'column',
    },
    paddedButton: {
        paddingTop: 5,
    },
});
