import React from "react";
import {Text, View} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalBody} from "../../modal/parts";
import {ModalFooter} from "../../modal/parts";
import {CardContentModel, CardContentType, cardContentTypes} from "../../../models";
import CardContentView from "../CardContent/CardContent";

export type AddContentModalProps = {
    onOk: () => boolean|void;
    onCancel?: () => boolean|void;
    onClose: () => void;
} & ModalProps;

export interface AddContentModalState {
    content: CardContentModel;
}

/**
 * A simple modal with "OK and "Cancel" buttons.
 */
export class AddContentModal extends Modal<AddContentModalProps, AddContentModalState> {
    state = {} as AddContentModalState;

    componentDidMount() {
        this.setState({
            content: new CardContentModel,
        });
    }

    shouldComponentUpdate(nextProps: Readonly<AddContentModalProps>, nextState: Readonly<AddContentModalState>, nextContext: any): boolean {
        console.log('shouldComponentUpdate');
        return true; // TODO -always- false on base class, and notify whatever calls renderModal
    }

    onPressOk = () => {
        const close = this.props.onOk() !== false;
        if (close) {
            this.props.onClose();
        }
    };

    onPressCancel = () => {
        const close = !this.props.onCancel || this.props.onCancel() !== false;
        if (close) {
            this.props.onClose();
        }
    };

    setType = (type: CardContentType) => {
        const content = this.state.content.update({ type });
        console.log('setType', {type, self: this, content});
        this.setState({ content });
    }

    renderModal() { // TODO RE-RENDER ON STATE CHANGE - https://reactjs.org/docs/portals.html ?
                    // TODO Native support? Create a component that sends it's children to the Renderer,
                    // so their native render function can be used, instead of them returning null.
        console.log('renderModal', this.state)
        return <ModalContainer>

            <ModalHeader title="Add Content" />

            <ModalBody>
                <View style={{ flexDirection: "row" }}>
                    {cardContentTypes.map(contentType => <View
                        key={contentType}
                        style={{ flex: 1, paddingHorizontal: 1 }}
                    >
                        <Button
                            title={contentType}
                            onClick={() => this.setType(contentType)}
                            disabled={this.state.content.type === contentType}
                        />
                    </View>)}
                </View>
                <Text>{`Type: ${this.state.content.type}`}</Text>
                <CardContentView content={this.state.content} contentIndex={0} parentHeight={300} />
            </ModalBody>

            <ModalFooter style={{
                flexDirection: "row", width: "100%",
            }}>
                <View style={{flex:1}}>
                    <Button title="OK" onClick={this.onPressOk} square />
                </View>
                <View style={{flex:1}}>
                    <Button title="Cancel" onClick={this.onPressCancel} square />
                </View>
            </ModalFooter>

        </ModalContainer>;
    }
}
export default AddContentModal;
