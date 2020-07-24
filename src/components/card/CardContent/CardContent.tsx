import React from "react";
import {View} from "react-native";
import CardContentActions from "./CardContentActions";
import CardContentMedia from "./CardContentMedia";
import CardContentResizer from "./CardContentResizer";

/** Minimum absolute height of the content. */
const MIN_HEIGHT = 40;

export interface CardContentProps {
    /** The content being represented. */
    content: CardContent;
    /** If the content is able to be edited. */
    editable?: boolean;
    /** If the content is currently being edited. */
    editing?: boolean;
    /** Called to notify the parent this is to be edited. */
    onEditing?: (content: CardContent|null) => void;
    /** Called to notify the parent the content has changed. */
    onChange?: (content: CardContent) => void;
    /** The height of the parent, to calculate the proportional height of the content. */
    parentHeight: number;
}
export interface CardContentState {
    /** User is currently resizing. */
    resizing: boolean;
    /** The height assigned while resizing. */
    resizePreviewHeight: number;
}

/** A view representing a content item on a card. */
export class CardContentView extends React.Component<CardContentProps, CardContentState> {
    state = {
        resizing: false,
        resizePreviewHeight: 0,
    } as CardContentState;

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
        if (this.state.resizing) return this.state.resizePreviewHeight;
        return this.calculatedHeight;
    }

    /** Notify parent that the user wants to edit this. */
    onPressEdit = () => this.props.onEditing && this.props.onEditing(this.props.content);

    /** Notify parent that the user is done editing. */
    onPressDone = () => this.props.onEditing && this.props.onEditing(null);

    /** Update the resize height. */
    onResize = (offsetY: number) => this.setState({
        resizing: true,
        resizePreviewHeight: Math.max(MIN_HEIGHT, (this.calculatedHeight || 0) + offsetY), // TODO Replace 0 with measured size?
    });

    /** Finish resizing and notify changes. */
    onResizeDone = (canceled: boolean) => {
        if (!canceled && this.props.onChange) {
            this.props.onChange({
                ...this.props.content,
                size: this.state.resizePreviewHeight / this.props.parentHeight
            });
        }
        this.setState({ resizing: false, resizePreviewHeight: 0 })
    };

    render() {
        const media = <CardContentMedia
            content={this.props.content}
            editing={this.props.editing}
            onChange={this.props.onChange}
            height={this.currentHeight}
        />;

        if (!this.props.editable) {
            return <View>{media}</View>;
        }

        return <View>
            {media}
            <CardContentActions
                editing={this.props.editing || false}
                onPressDone={this.onPressDone}
                onPressEdit={this.onPressEdit}
            />
            <CardContentResizer
                editing={this.props.editing || false}
                text={this.currentHeight ? `${Math.floor((this.currentHeight / this.props.parentHeight) * 100)}%` : `auto`}
                onMove={this.onResize}
                onFinished={this.onResizeDone}
            />
        </View>;
    }
}
export default CardContentView;
