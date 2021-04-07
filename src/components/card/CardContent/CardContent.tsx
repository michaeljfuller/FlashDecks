import React from "react";
import {View} from "react-native";
import CardContentActions from "./CardContentActions";
import CardContentMedia from "./CardContentMedia";
import CardContentResizer from "./CardContentResizer";
import {CardContentModel} from "../../../models";
import ImmutablePureComponent from "../../ImmutablePureComponent";

/** Minimum absolute height of the content. */
const MIN_HEIGHT = 40;

export interface CardContentProps {
    /** The content being represented. */
    content: CardContentModel;
    /** The index of the content being represented. */
    contentIndex?: number;
    /** If the content is able to be edited. */
    editable?: boolean;
    /** If the content is currently being resized. */
    resizing?: boolean;
    /** Called to notify the parent this is to be edited. */
    onEditing?: (content: CardContentModel|null, contentIndex: number) => void;
    /** Called to notify the parent this is to be resized. */
    onResizing?: (content: CardContentModel|null, contentIndex: number) => void;
    /** Called to notify the parent is to add content at the specified index. */
    onAdd?: (contentIndex: number) => void;
    /** Called to notify the parent the content is to be deleted */
    onDelete?: (content: CardContentModel, contentIndex: number) => void;
    /** Called to notify the parent the content is to be changed. */
    onChange?: (content: CardContentModel, contentIndex: number) => void;
    /** The height of the parent, to calculate the proportional height of the content. */
    parentHeight: number;
}
export interface CardContentState {
    /** The height assigned while resizing. */
    resizePreviewHeight: number|null;
}

/** A view representing a content item on a card. */
export class CardContentView extends ImmutablePureComponent<CardContentProps, CardContentState> {
    readonly state = {
        resizePreviewHeight: null,
    } as Readonly<CardContentState>;

    /** The absolute height, calculated off the recorded content size and the parent height.  */
    get calculatedHeight() {
        if (this.props.content.size && this.props.parentHeight) {
            const calculated = Math.floor(this.props.content.size * this.props.parentHeight);
            return calculated ? Math.max(calculated, MIN_HEIGHT) : undefined;
        }
        return undefined;
    }

    /** The current height, while resizing or otherwise. */
    get currentHeight() {
        if (this.state.resizePreviewHeight !== null) return this.state.resizePreviewHeight;
        return this.calculatedHeight;
    }

    /** Notify parent that the user wants to edit this. */
    onPressEdit = () => this.props.onEditing && this.props.onEditing(this.props.content, this.props.contentIndex || 0);

    /** Notify parent that the user wants to edit this. */
    onPressResize = () => this.props.onResizing && this.props.onResizing(this.props.content, this.props.contentIndex || 0);

    /** Notify parent that the user wants to delete this. */
    onPressDelete = () => this.props.onDelete && this.props.onDelete(this.props.content, this.props.contentIndex || 0);

    /** Notify parent that we want to add an item at the specified index. */
    onPressAddBefore = () => this.props.onAdd && this.props.onAdd(this.props.contentIndex || 0);
    onPressAddAfter = () => this.props.onAdd && this.props.onAdd((this.props.contentIndex || 0) + 1);

    /** Notify parent that the user is done editing. */
    onPressDone = () => {
        this.props.onEditing && this.props.onEditing(null, this.props.contentIndex || 0);
        this.props.onResizing && this.props.onResizing(null, this.props.contentIndex || 0);
    }

    /** Update the resize height. */
    onResize = (offsetY: number) => this.setStateTo({
        resizePreviewHeight: Math.max(MIN_HEIGHT, (this.calculatedHeight || 0) + offsetY), // TODO Replace 0 with measured size?
    });

    /** Finish resizing and notify changes. */
    onResizeDone = (canceled: boolean) => {
        if (!canceled && this.props.onChange) {
            this.props.onChange(
                this.props.content.update({
                    size: (this.state.resizePreviewHeight || 0) / this.props.parentHeight
                }),
                this.props.contentIndex || 0
            );
        }
        this.setStateTo({ resizePreviewHeight: null });
    };

    render() {
        const media = <CardContentMedia content={this.props.content} height={this.currentHeight} minHeight={30} />;

        if (!this.props.editable) {
            return <View>{media}</View>;
        }

        return <View>
            {media}
            <CardContentResizer
                editing={this.props.resizing || false}
                text={this.currentHeight ? `${Math.floor((this.currentHeight / this.props.parentHeight) * 100)}%` : `auto`}
                onMove={this.onResize}
                onFinished={this.onResizeDone}
            />
            <CardContentActions
                resizing={this.props.resizing || false}
                onPressDone={this.onPressDone}
                onPressAddBefore={this.onPressAddBefore}
                onPressAddAfter={this.onPressAddAfter}
                onPressEdit={this.onPressEdit}
                onPressResize={this.onPressResize}
                onPressDelete={this.onPressDelete}
            />
        </View>;
    }
}
export default CardContentView;
