import React from "react";
import {StyleSheet, View} from "react-native";
import IconButton, {IconType} from "../../button/IconButton";

interface CardContentActionsProps {
    editing: boolean;
    resizing: boolean;
    onPressDone: () => void;
    onPressEdit: () => void;
    onPressResize: () => void;
}

/** Action buttons for CardContent. */
export function CardContentActions(props: CardContentActionsProps) {
    if (props.editing || props.resizing) {
        return <View style={styles.root}>
            <IconButton icon={IconType.Done} onClick={props.onPressDone} color="Black" />
        </View>;
    } else {
        const margin = 1;
        return <View style={styles.root}>
            <IconButton icon={IconType.Edit} onClick={props.onPressEdit} color="Black" style={{ margin }} />
            <IconButton icon={IconType.Resize} onClick={props.onPressResize} color="Black" style={{ margin }} />
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
