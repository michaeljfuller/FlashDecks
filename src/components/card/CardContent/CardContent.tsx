import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {CardMediaError} from "./media/CardMediaError";
import {CardMediaImage} from "./media/CardMediaImage";
import {CardMediaLink} from "./media/CardMediaLink";
import {CardMediaText} from "./media/CardMediaText";
import {CardMediaVideo} from "./media/CardMediaVideo";
import IconButton, {IconType} from "../../button/IconButton";

export interface CardContentProps {
    content: CardContent;
    editable?: boolean;
    editing?: boolean;
    onEditing?: (content: CardContent|null) => void;
    onChange?: (content: CardContent) => void;
    parentHeight: number;
}

export function CardContentView(props: CardContentProps) {
    if (!props.editable) {
        return <View>{getMedia(props)}</View>;
    }

    const onPressEdit = useCallback(
        () => { props.onEditing && props.onEditing(props.content) },
        [props.onEditing, props.content]
    );
    const onPressDone = useCallback(
        () => { props.onEditing && props.onEditing(null) },
        [props.onEditing, props.content]
    );

    return <View>
        {getMedia(props)}
        <CardContentActions editing={props.editing || false} onPressDone={onPressDone} onPressEdit={onPressEdit} />
    </View>;
}
export default CardContentView;

interface CardContentActionsProps {
    editing: boolean;
    onPressDone: () => void;
    onPressEdit: () => void;
}
function CardContentActions(props: CardContentActionsProps) {
    if (props.editing) {
        return <View style={styles.actionsRow}>
            <IconButton icon={IconType.Done} onClick={props.onPressDone} color="Black" />
        </View>;
    } else {
        return <View style={styles.actionsRow}>
            <IconButton icon={IconType.Edit} onClick={props.onPressEdit} color="Black" />
        </View>;
    }
}

function getMedia(props: CardContentProps): JSX.Element {
    let height: undefined|number = undefined;
    if (props.content.size && props.parentHeight) {
        height = Math.floor(props.parentHeight * props.content.size) || undefined;
    }
    switch (props.content.type) {
        case "Image": return <CardMediaImage content={props.content} height={height} />;
        case "Link": return <CardMediaLink content={props.content} height={height} />;
        case "Text": return <CardMediaText content={props.content} height={height} editing={props.editing} onChange={props.onChange} />;
        case "Video": return <CardMediaVideo content={props.content} height={height} />;
    }
    return <CardMediaError message={`Unhandled content type "${props.content.type}".`} height={height} />;
}

const styles = StyleSheet.create({
    actionsRow: {
        flexDirection: 'row',
        position: "absolute",
        top: 5,
        right: 5,
    },
});
