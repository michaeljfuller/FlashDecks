import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, ViewStyle} from 'react-native';
import {Color} from "../../../styles/Color";
import CardContentView from "../CardContent/CardContent";
import {CardContentModel, CardSideModel} from "../../../models";
import {PromptModal} from "../../modal/PromptModal/PromptModal";
import {AddContentModal} from "./AddContentModal";

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
    contentIndexToAdd: number;
    contentIndexToDelete: number;
    updatedSide?: CardSideModel;
    addingContent?: CardContentModel;
}

export class CardSide extends React.Component<CardSideProps, CardSideState> {
    state = {
        editingContentId: '',
        resizingContentId: '',
        contentIndexToAdd: -1,
        contentIndexToDelete: -1,
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

    //<editor-fold desc="Add Content">

    onContentAdd = (index: number) => {
        this.setState({ contentIndexToAdd: index, addingContent: new CardContentModel });
    }

    onContentAddConfirmed = () => {
        const content = this.state.addingContent;
        const index = this.state.contentIndexToAdd;
        if (content) {
            this.updateSide(this.currentSide.insertContent(content, index));
        }
    }

    onContentAddClosed = () => {
        this.setState({ contentIndexToAdd: -1, addingContent: undefined });
    }

    //</editor-fold>
    //<editor-fold desc="Delete Content">

    onContentDelete = (content: CardContentModel, contentIndex: number) => {
        this.setState({ contentIndexToDelete: contentIndex });
    }

    onContentDeleteConfirmed = () => {
        const index = this.state.contentIndexToDelete;
        if (index !== undefined) {
            this.updateSide(this.currentSide.deleteContent(index));
            this.onContentDeleteClosed();
        }
    }

    onContentDeleteClosed = () => {
        this.setState({ contentIndexToDelete: -1 });
    }

    //</editor-fold>

    private updateSide(side: CardSideModel) {
        this.setState({ updatedSide: side });
        if (this.props.onModifications) this.props.onModifications(side);
    }

    render() {
        const {onPress, style, editing, height} = this.props;
        const {editingContentId, resizingContentId} = this.state;

        return <React.Fragment>
            <TouchableWithoutFeedback onPress={onPress}>
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
                        onAdd={this.onContentAdd}
                        onChange={this.onContentChange}
                        onDelete={this.onContentDelete}
                    />)}
                </View>
            </TouchableWithoutFeedback>

            {this.renderAddContent()}
            {this.renderDeleteContent()}

        </React.Fragment>;
    }

    private renderAddContent() {
        return <AddContentModal
            open={this.state.contentIndexToAdd >= 0}
            onOk={this.onContentAddConfirmed}
            onClose={this.onContentAddClosed}
        />;
    }

    private renderDeleteContent() {
        return <PromptModal
            title="Delete Content"
            open={this.state.contentIndexToDelete >= 0}
            onOk={this.onContentDeleteConfirmed}
            onClose={this.onContentDeleteClosed}
        >
            <View style={{ margin: 10 }}>
                <CardContentView
                    content={this.currentSide.content[this.state.contentIndexToDelete]}
                    contentIndex={this.state.contentIndexToDelete}
                    parentHeight={300}
                />
            </View>
        </PromptModal>;
    }
}
export default CardSide;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.White,
        paddingHorizontal: 8,
    },
});
