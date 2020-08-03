import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {ActionSheet} from "native-base";

import {CardContentActionsProps} from "./CardContentActions.common";
import IconButton, {IconType} from "../../button/IconButton";

/** Action buttons for CardContent. */
export function CardContentActions(props: CardContentActionsProps) {
    const onPress = useCallback(() => {
        showActions(
            props.onPressEdit,
            props.onPressAddBefore,
            props.onPressAddAfter,
            props.onPressResize,
            props.onPressDelete
        );
    }, [
        props.onPressEdit,
        props.onPressAddBefore,
        props.onPressAddAfter,
        props.onPressResize,
        props.onPressDelete
    ]);

    const buttons = [] as React.ReactElement[];
    if (props.editing || props.resizing) {
        buttons.push(<IconButton key="done" icon={IconType.Done} onClick={props.onPressDone} color="Black" />);
    } else {
        buttons.push(<IconButton key="open" icon={IconType.More} onClick={onPress} color="Black" />);
    }
    return <View style={styles.root}>
        {buttons}
    </View>;
}
export default CardContentActions;

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
    onResize: () => void,
    onDelete: () => void,
) {
    const DeleteLabel = 'Delete', CancelLabel = 'Cancel';
    const buttons: Record<string, Function|null> = {
        'Edit': onEdit,
        'Resize': onResize,
        'Add Before': onAddBefore,
        'Add After': onAddAfter,
        [DeleteLabel]: onDelete,
        [CancelLabel]: null
    };
    const buttonNames = Object.keys(buttons);
    ActionSheet.show(
        {
            title: 'Make changes',
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
