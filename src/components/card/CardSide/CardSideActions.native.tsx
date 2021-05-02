import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {ActionSheet} from "native-base";

import {CardActionsProps} from "./CardSideActions.common";
import IconButton, {IconType} from "../../button/IconButton";

/** Action buttons for CardContent. */
export const CardSideActions = React.memo(function CardSideActions(props: CardActionsProps) {
    const onPress = useCallback(() => {
        showActions(
            props.onPressEdit,
            props.onPressAddBefore,
            props.onPressAddAfter,
            props.onPressDelete
        );
    }, [
        props.onPressEdit,
        props.onPressAddBefore,
        props.onPressAddAfter,
        props.onPressDelete
    ]);

    let button: React.ReactElement;
    if (props.editing) {
        button = <React.Fragment>
            <IconButton icon={IconType.Done}   onClick={props.onPressDone}   disabled={props.disabled} color="Black" />
            <IconButton icon={IconType.Cancel} onClick={props.onPressCancel} disabled={props.disabled} color="Black" />
        </React.Fragment>;
    } else {
        button = <IconButton icon={IconType.More} onClick={onPress} disabled={props.disabled} color="Black" />;
    }
    return <View style={styles.root}>{button}</View>;
});
export default CardSideActions;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        right: 5,
    },
});

function showActions(
    onEdit: () => void,
    onAddBefore: () => void,
    onAddAfter: () => void,
    onDelete: () => void,
) {
    const DeleteLabel = 'Delete Side', CancelLabel = 'Cancel';
    const buttons: Record<string, Function|null> = {
        'Edit Side': onEdit,
        'Add Before': onAddBefore,
        'Add After': onAddAfter,
        [DeleteLabel]: onDelete,
        [CancelLabel]: null
    };
    const buttonNames = Object.keys(buttons);
    ActionSheet.show(
        {
            title: 'Card Side',
            options: buttonNames,
            cancelButtonIndex: buttonNames.indexOf(CancelLabel), // Separate out in iOS.
            destructiveButtonIndex: buttonNames.indexOf(DeleteLabel), // Highlight red in iOS.
        },
        buttonIndex => {
            const buttonFunction = Object.values(buttons)[buttonIndex];
            if (buttonFunction) buttonFunction();
        }
    );
}
