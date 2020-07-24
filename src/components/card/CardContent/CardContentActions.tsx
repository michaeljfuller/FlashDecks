import React from "react";
import {StyleSheet, View} from "react-native";
import IconButton, {IconType} from "../../button/IconButton";

interface CardContentActionsProps {
    editing: boolean;
    onPressDone: () => void;
    onPressEdit: () => void;
}

/** Action buttons for CardContent. */
export function CardContentActions(props: CardContentActionsProps) {
    if (props.editing) {
        return <View style={styles.root}>
            <IconButton icon={IconType.Done} onClick={props.onPressDone} color="Black" />
        </View>;
    } else {
        return <View style={styles.root}>
            <IconButton icon={IconType.Edit} onClick={props.onPressEdit} color="Black" />
        </View>;
    }
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
