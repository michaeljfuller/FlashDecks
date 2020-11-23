import React from "react";
import {Text, TextInput, View} from "react-native";
import {ModalBody, ModalFooter, ModalHeader} from "../../../modal/parts";
import {CardModel} from "../../../../models";
import Button from "../../../button/Button";
import {styles} from "./cardInfoModalStyle";
import {CardInfo} from "../CardInfoModal";
import {withDefaults} from "../../../../utils/object";

interface CardInfoModalEditProps {
    title: string;
    card: CardModel;
    onPressOK: (info: CardInfo) => void;
    onPressCancel: () => void;
}
interface CardInfoModalEditState {
    info?: CardInfo;
}

export class CardInfoModalEdit extends React.PureComponent<CardInfoModalEditProps, CardInfoModalEditState> {
    state: CardInfoModalEditState = {};

    /** Get the current info, defaulting to the passed deck. */
    get info(): CardInfo {
        return withDefaults<CardInfo>(
            this.state.info,
            { title: this.props.card.title }
        );
    }

    /** Is the input valid. */
    get valid(): boolean {
        return Boolean(this.info.title);
    }

    componentDidUpdate(prevProps: Readonly<CardInfoModalEditProps>/*, prevState: Readonly<CardInfoModalEditState>, snapshot?: any*/) {
        if (CardModel.different(prevProps.card, this.props.card)) {
            this.setState({ info: undefined }); // If card changed, reset info.
        }
    }

    /** Set the current info. */
    setInfo(partial: Partial<CardInfo>) {
        this.setState({
            info: withDefaults(partial, this.info)
        });
    }

    onChangeTitle = (title: string) => this.setInfo({title});
    onPressOkButton = () => this.props.onPressOK(this.info);

    render() {
        const {title, onPressCancel} = this.props;
        const info = this.info;

        return <React.Fragment>

            <ModalHeader title={title} />

            <ModalBody>
                <View style={styles.row}>
                    <Text style={styles.titleLabel}>Title:</Text>
                    <TextInput
                        focusable
                        autoFocus
                        style={styles.titleInput}
                        value={info.title}
                        onChangeText={this.onChangeTitle}
                    />
                </View>
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button title="OK"     style={styles.footerItem} square onClick={this.onPressOkButton} disabled={!this.valid} />
                <Button title="Cancel" style={styles.footerItem} square onClick={onPressCancel} />
            </ModalFooter>

        </React.Fragment>;
    }

}
