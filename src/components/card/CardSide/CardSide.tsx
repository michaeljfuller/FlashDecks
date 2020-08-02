import React from 'react';
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

export interface CardSideState {
    editingContentId: string;
    resizingContentId: string;
    updatedSide?: CardSideModel;
}

export class CardSide extends React.Component<CardSideProps, CardSideState> {
    state = {
        editingContentId: '',
        resizingContentId: '',
    } as CardSideState;

    get currentSide(): CardSideModel {
        return this.state.updatedSide || this.props.side || new CardSideModel;
    }

    componentDidUpdate(prevProps: Readonly<CardSideProps>) {
        if (prevProps.side !== this.props.side) {
            this.setState({ updatedSide: this.props.side });
        }
    }

    onContentEditing = (content: CardContentModel|null) => {
        this.setState({ editingContentId: content ? content.id : '' })
    }

    onContentResizing = (content: CardContentModel|null) => {
        this.setState({ resizingContentId: content ? content.id : '' })
    }

    onContentChange = (content: CardContentModel, contentIndex: number) => {
        this.updateSide(this.currentSide.setContent(content, contentIndex));
    }

    onContentDelete = (content: CardContentModel, contentIndex: number) => {
        this.updateSide(this.currentSide.deleteContent(contentIndex)); // TODO Confirmation modal?
    }

    private updateSide(side: CardSideModel) {
        this.setState({ updatedSide: side });
        if (this.props.onModifications) this.props.onModifications(side);
    }

    render() {
        const {onPress, style, editing, height} = this.props;
        const {editingContentId, resizingContentId} = this.state;

        return <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.root, style].flat()}>
                {this.currentSide.content.map((content, index) => <CardContentView
                    key={content.id}
                    content={content}
                    contentIndex={index}
                    parentHeight={height}
                    editable={editing}
                    editing={editing && editingContentId === content.id}
                    resizing={editing && resizingContentId === content.id}
                    onEditing={this.onContentEditing}
                    onResizing={this.onContentResizing}
                    onChange={this.onContentChange}
                    onDelete={this.onContentDelete}
                />)}
            </View>
        </TouchableWithoutFeedback>;
    }
}
export default CardSide;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.White,
        paddingHorizontal: 8,
    },
});
