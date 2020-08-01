import React, {useState, useCallback} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, ViewStyle} from 'react-native';
import {Color} from "../../../styles/Color";
import CardContentView from "../CardContent/CardContent";
import {CardContentModel, CardSideModel} from "../../../models";


export interface CardSideProps {
    side?: CardSideModel;
    style?: ViewStyle|Array<ViewStyle|null|undefined>;
    height: number;
    editing?: boolean;
    onPress?: () => void;
    onModifications?: (side: CardSideModel|null) => void;
}
// Modifications (or deletion if null), mapped to content ID.
type ContentIdModificationsMap = Record<string, CardContentModel|null>;

export function CardSide(props: CardSideProps) {
    // ID of the content being edited.
    const [editingContentId, setEditingContentId] = useState('');
    // ID of the content being resized.
    const [resizingContentId, setResizingContentId] = useState('');
    // Map of content changes to be applied.
    const [contentModifications, setContentModifications] = useState<ContentIdModificationsMap>({}); // TODO Clear if side changes

    // Set ID of content to be edited.
    const onContentEditing = useCallback((content: CardContentModel|null) => {
        setEditingContentId(content ? content.id : '');
    }, []);

    // Set ID of content to be resized.
    const onContentResizing = useCallback((content: CardContentModel|null) => {
        setResizingContentId(content ? content.id : '');
    }, []);

    // Map content changes to content ID.
    const onContentChange = useCallback((modifiedContent: CardContentModel) => {
        const modifications: ContentIdModificationsMap = {...contentModifications, [modifiedContent.id]: modifiedContent};
        setContentModifications(modifications);
        const side = modifySideContent(props.side, modifications);
        props.onModifications && props.onModifications(side);
    }, [contentModifications]);

    // Map content deletion to content ID.
    const onContentDelete = useCallback((modifiedContent: CardContentModel) => {
        const modifications: ContentIdModificationsMap = {...contentModifications, [modifiedContent.id]: null};
        setContentModifications(modifications);
        const side = modifySideContent(props.side, modifications);
        props.onModifications && props.onModifications(side);
    }, [contentModifications]);

    const content: readonly CardContentModel[] = props.side?.content || [];
    const displayContent = content.filter(
        item => contentModifications[item.id] !== null // null === "deleted", undefined === "unchanged"
    ).map(
        item => contentModifications[item.id] || item
    );

    return <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={[styles.root, props.style].flat()}>
            {displayContent.map(content => <CardContentView
                key={content.id}
                content={content}
                parentHeight={props.height}
                editable={props.editing}
                editing={props.editing && editingContentId === content.id}
                resizing={props.editing && resizingContentId === content.id}
                onEditing={onContentEditing}
                onResizing={onContentResizing}
                onChange={onContentChange}
                onDelete={onContentDelete}
            />)}
        </View>
    </TouchableWithoutFeedback>;
}
export default CardSide;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.White,
        paddingHorizontal: 8,
    },
});

function modifySideContent(side: CardSideModel|undefined, modifications: ContentIdModificationsMap): CardSideModel {
    side = side || new CardSideModel();
    const existingContent: readonly CardContentModel[] = side.content || [];

    const nextContent: CardContentModel[] = [];
    existingContent.forEach(content => {
        if (modifications[content.id] !== null) { // If not deleted, use modified or original
            nextContent.push(modifications[content.id] || content);
        }
    });

    console.group('modifySideContent');
    console.log('existingContent', existingContent);
    console.log('modifications', modifications);
    console.log('nextContent', nextContent);
    console.groupEnd();

    return side.update({ content: nextContent });
}
