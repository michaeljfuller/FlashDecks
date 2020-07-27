import React, {useState, useCallback} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, ViewStyle} from 'react-native';
import {Color} from "../../../styles/Color";
import CardContentView from "../CardContent/CardContent";

export interface CardSideProps {
    side?: CardSide;
    style?: ViewStyle|Array<ViewStyle|null|undefined>;
    height: number;
    editing?: boolean;
    onPress?: () => void;
    onModifications?: (side: CardSide|null) => void;
}
type ContentIdModificationsMap = Record<string, CardContent>;

export function CardSide(props: CardSideProps) {
    // ID of the content being edited.
    const [editingContentId, setEditingContentId] = useState('');
    // ID of the content being resized.
    const [resizingContentId, setResizingContentId] = useState('');
    // Map of content changes to be applied.
    const [contentModifications, setContentModifications] = useState<ContentIdModificationsMap>({}); // TODO Clear if side changes

    // Set ID of content to be edited.
    const onContentEditing = useCallback((content: CardContent|null) => {
        setEditingContentId(content ? content.id : '');
    }, []);

    // Set ID of content to be resized.
    const onContentResizing = useCallback((content: CardContent|null) => {
        setResizingContentId(content ? content.id : '');
    }, []);

    // Map content changes to content ID.
    const onContentChange = useCallback((modifiedContent: CardContent) => {
        const modifications: ContentIdModificationsMap = {...contentModifications, [modifiedContent.id]: modifiedContent};
        setContentModifications(modifications);

        const side = { content: [] } as CardSide;
        const existingContent: CardContent[] = props.side?.content || [];

        // Use modified version, or clone original.
        existingContent.forEach(content => {
            if (modifications[content.id]) {
                side.content.push(modifications[content.id]);
            } else {
                side.content.push({...content});
            }
        });

        props.onModifications && props.onModifications(side);
    }, [contentModifications]);

    const content: CardContent[] = props.side?.content || [];

    return <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={[styles.root, props.style].flat()}>
            {content.map(content => <CardContentView
                key={content.id}
                content={contentModifications[content.id] || content}
                parentHeight={props.height}
                editable={props.editing}
                editing={props.editing && editingContentId === content.id}
                resizing={props.editing && resizingContentId === content.id}
                onEditing={onContentEditing}
                onResizing={onContentResizing}
                onChange={onContentChange}
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
