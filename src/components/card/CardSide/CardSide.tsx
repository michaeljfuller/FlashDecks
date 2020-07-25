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
}
type ContentIdModificationsMap = Record<string, CardContent>;

export function CardSide(props: CardSideProps) {
    const [editingContentId, setEditingContentId] = useState('');
    const [contentModifications, setContentModifications] = useState<ContentIdModificationsMap>({});

    const onContentEditing = useCallback((content: CardContent|null) => {
        setEditingContentId(content ? content.id : '')
    }, []);
    const onContentChange = useCallback((content: CardContent) => {
        setContentModifications({...contentModifications, [content.id]: content})
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
                onEditing={onContentEditing}
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
