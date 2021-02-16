import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import ImmutablePureComponent, {castDraft} from "../../ImmutablePureComponent";
import {Color} from "../../../styles/Color";
import CardContentView from "../CardContent/CardContent";
import {CardContentModel, CardSideModel} from "../../../models";
import {PromptModal} from "../../modal/PromptModal/PromptModal";
import {ModifyContentModal} from "../ModifyContent/ModifyContentModal";
import Button, {IconType} from "../../button/Button";
import Column from "../../layout/Column";
import Row from "../../layout/Row";
import IconButton from "../../button/IconButton";
import {Visibility} from "../../layout/Visibility";

export interface CardSideProps {
    side?: CardSideModel|undefined;
    style?: ViewStyle|Array<ViewStyle|null|undefined>;
    height: number;
    editing?: boolean;
    editable?: boolean;
    onPress?: () => void;
    onModifications?: (side: CardSideModel|null) => void;
}

export interface CardSideState {
    updatedSide?: CardSideModel;
    modifyContent: CardContentModel|null;
    addContentIndex: number;
    modifyContentIndex: number;
    resizeContentIndex: number;
    contentIndexToDelete: number;
}

export class CardSide extends ImmutablePureComponent<CardSideProps, CardSideState> {
    readonly state = {
        modifyContent: null,
        addContentIndex: -1,
        modifyContentIndex: -1,
        resizeContentIndex: -1,
        contentIndexToDelete: -1,
    } as Readonly<CardSideState>;

    get currentSide(): CardSideModel {
        return this.state.updatedSide || this.props.side || new CardSideModel;
    }
    get currentContent(): readonly CardContentModel[] {
        return this.currentSide.content;
    }

    get isAddingContent() {
        return this.state.addContentIndex >= 0;
    }
    get isModifyingContent() {
        return this.state.modifyContentIndex >= 0;
    }
    get isDeletingContent() {
        return this.state.contentIndexToDelete >= 0;
    }

    componentDidUpdate(prevProps: Readonly<CardSideProps>) {
        if (prevProps.side !== this.props.side) {
            this.setStateTo(draft => draft.updatedSide = castDraft(this.props.side));
        }
    }

    onContentEditing = (content: CardContentModel|null, index: number) => {
        this.setStateTo(draft => {
            draft.modifyContent = content;
            draft.modifyContentIndex = content ? index : -1;
        });
    }

    onContentResizing = (content: CardContentModel|null, index: number) => {
        this.setStateTo({ resizeContentIndex: content ? index : -1 })
    }

    onContentChange = (content: CardContentModel, contentIndex: number) => {
        this.updateSide(
            this.currentSide.setContent(content, content ? contentIndex : -1)
        );
    }

    //<editor-fold desc="Add Content">

    onContentAdd = (indexOrEvent: number|any) => {
        const index = typeof indexOrEvent === "number" ? indexOrEvent : this.currentContent.length;
        this.setStateTo(draft => {
            draft.modifyContent = new CardContentModel;
            draft.addContentIndex = index;
        });
    }

    onContentModifyChange = (content: CardContentModel) => this.setStateTo(draft => draft.modifyContent = content);

    onContentModifyConfirmed = () => {
        const { modifyContent, addContentIndex, modifyContentIndex } = this.state;
        if (this.isAddingContent) {
            this.updateSide(
                this.currentSide.insertContent(modifyContent || new CardContentModel, addContentIndex)
            );
        } else if (this.isModifyingContent) {
            this.updateSide(
                this.currentSide.setContent(modifyContent || new CardContentModel, modifyContentIndex)
            );
        }
    }

    onContentModifyClosed = () => {
        this.setStateTo({
            modifyContent: null,
            addContentIndex: -1,
            modifyContentIndex: -1,
        });
    }

    //</editor-fold>
    //<editor-fold desc="Delete Content">

    onContentDelete = (content: CardContentModel, contentIndex: number) => {
        this.setStateTo(draft => draft.contentIndexToDelete = contentIndex);
    }

    onContentDeleteConfirmed = () => {
        const index = this.state.contentIndexToDelete;
        if (index !== undefined) {
            this.updateSide(
                this.currentSide.deleteContent(index)
            );
            this.onContentDeleteClosed();
        }
    }

    onContentDeleteClosed = () => {
        this.setStateTo({ contentIndexToDelete: -1 });
    }

    //</editor-fold>

    private updateSide(side: CardSideModel) {
        this.setStateTo(draft => draft.updatedSide = castDraft(side));
        if (this.props.onModifications) this.props.onModifications(side);
    }

    render() {
        const {onPress, style, editing, height} = this.props;
        const {resizeContentIndex} = this.state;

        return <React.Fragment>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.root, style].flat()}>
                    {this.currentContent.map((content, index) => <CardContentView
                        key={content.transientKey}
                        content={content}
                        contentIndex={index}
                        parentHeight={height}
                        editable={editing}
                        resizing={editing && resizeContentIndex === index}
                        onEditing={this.onContentEditing}
                        onResizing={this.onContentResizing}
                        onAdd={this.onContentAdd}
                        onChange={this.onContentChange}
                        onDelete={this.onContentDelete}
                    />)}
                    {this.renderNoContent()}
                </View>
            </TouchableWithoutFeedback>

            {this.renderModifyContentModal()}
            {this.renderDeleteContentModal()}

        </React.Fragment>;
    }

    private renderModifyContentModal() {
        return <ModifyContentModal
            open={this.isAddingContent || this.isModifyingContent}
            title={this.isAddingContent ? "Add Content" : "Modify Content"}
            content={this.state.modifyContent || new CardContentModel}
            onOk={this.onContentModifyConfirmed}
            onChange={this.onContentModifyChange}
            onClose={this.onContentModifyClosed}
        />;
    }

    private renderDeleteContentModal() {
        return <PromptModal
            title="Delete Content"
            open={this.isDeletingContent}
            onOk={this.onContentDeleteConfirmed}
            onClose={this.onContentDeleteClosed}
        >
            <View style={{ margin: 10 }}>
                <CardContentView
                    content={this.currentContent[this.state.contentIndexToDelete]}
                    contentIndex={this.state.contentIndexToDelete}
                    parentHeight={300}
                />
            </View>
        </PromptModal>;
    }

    private renderNoContent() {
        if (this.currentContent.length > 0) return null;
        const {editing, editable} = this.props;

        return <Column center flex>
            <Text style={styles.emptySideText}>This side is empty.</Text>
            <Visibility render={editable}>
            {
                editing ? <View>
                    <Text style={styles.emptySideText}>Once you are done, press the check button to apply changes.</Text>
                    <Button title="Add Content" style={styles.addContentButton} onClick={this.onContentAdd} />
                </View> : <Row center wrap>
                    <Text style={styles.emptySideText} numberOfLines={1}>Press the top-right</Text>
                    <IconButton icon={IconType.More} color="Black" />
                    <Text style={styles.emptySideText} numberOfLines={1}>button to edit.</Text>
                </Row>
            }
            </Visibility>
        </Column>;
    }

}
export default CardSide;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.White,
        paddingHorizontal: 8,
    },
    emptySideText: {
        marginHorizontal: 3,
        lineHeight: 24,
        textAlign: "center",
        overflow: "visible",
    },
    addContentButton: {
        marginTop: 10,
        marginHorizontal: 10,
    },
});
