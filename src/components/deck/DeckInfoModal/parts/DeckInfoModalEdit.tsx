import React from "react";
import {Text, TextInput, View} from "react-native";
import {ModalBody, ModalFooter, ModalHeader} from "../../../modal/parts";
import {DeckInfoModelTags} from "../DeckInfoModalTags";
import {DeckModel} from "../../../../models";
import Button from "../../../button/Button";
import {styles} from "./deckInfoModalStyles";
import {DeckInfo} from "../DeckInfoModal";
import {withDefaults} from "../../../../utils/object";

interface DeckInfoEditModalBodyProps {
    deck: DeckModel;
    disabled: boolean;
    onPressSave: (info: DeckInfo) => void;
    onPressCancel: () => void;
}

interface DeckInfoModalEditState {
    info?: DeckInfo;
}

export class DeckInfoModalEdit extends React.PureComponent<DeckInfoEditModalBodyProps, DeckInfoModalEditState> {
    state = {} as DeckInfoModalEditState;

    /** Get the current info, defaulting to the passed deck. */
    get info(): DeckInfo {
        return withDefaults<DeckInfo>(this.state.info, {
            title: this.props.deck.title,
            description: this.props.deck.description,
            tags: this.props.deck.tags,
        });
    }

    /** Is the input valid. */
    get valid(): boolean {
        const {title, description} = this.info;
        return Boolean(title && description);
    }

    componentDidUpdate(prevProps: Readonly<DeckInfoEditModalBodyProps>/*, prevState: Readonly<DeckInfoModalEditState>, snapshot?: any*/) {
        if (DeckModel.different(prevProps.deck, this.props.deck)) {
            this.setState({ info: undefined }); // If deck changed, reset info.
        }
    }

    /** Set the current info. */
    setInfo(partial: Partial<DeckInfo>) {
        this.setState({
            info: withDefaults(partial, this.info)
        });
    }

    onChangeTitle = (title: string) => this.setInfo({title});
    onChangeDescription = (description: string) => this.setInfo({description});
    onChangeTags = (tags: string[]) => this.setInfo({tags});

    onPressSaveButton = () => this.props.onPressSave(this.info);

    render() {
        const {deck, disabled} = this.props;
        const {title, description, tags} = this.info;
        const numberOfDescriptionLines = Math.max(12, deck.description.split('\n').length);

        return <React.Fragment>

            <ModalHeader title='Deck Details' user={deck.owner} />

            <ModalBody>
                <View style={styles.titleInputRow}>
                    <Text style={styles.titleLabel}>Title:</Text>
                    <TextInput
                        editable={!disabled}
                        focusable
                        autoFocus={!title}
                        style={styles.titleInput}
                        value={title}
                        onChangeText={this.onChangeTitle}
                    />
                </View>

                <DeckInfoModelTags editable tags={tags} onChange={this.onChangeTags} />

                <Text style={styles.titleLabel}>Description</Text>
                <TextInput
                    editable={!disabled}
                    multiline
                    focusable
                    numberOfLines={numberOfDescriptionLines}
                    style={styles.descriptionInput}
                    value={description}
                    onChangeText={this.onChangeDescription}
                />
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button title="Save"   style={styles.footerItem} square onClick={this.onPressSaveButton}   disabled={disabled || !this.valid} />
                <Button title="Cancel" style={styles.footerItem} square onClick={this.props.onPressCancel} disabled={disabled} />
            </ModalFooter>

        </React.Fragment>;
    }
}
