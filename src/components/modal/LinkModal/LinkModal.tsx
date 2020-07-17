import React from "react";
import {Alert, Linking, Text, View, StyleSheet} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../core/Modal";
import {ModalContainer, ModalHeader, ModalBody, ModalFooter} from "../parts";
import {Color} from "../../../styles/Color";
import {isPlatformWeb} from "../../../platform";

export type LinkModalProps = {
    url: string;
} & ModalProps;

/**
 * Prompt the user to follow a link.
 */
export class LinkModal extends Modal<LinkModalProps> {
    goToUrl = async () => {
        if (isPlatformWeb) {
            window.open(this.props.url, '_blank');
        } else {
            const supported = await Linking.canOpenURL(this.props.url);
            if (supported) {
                await Linking.openURL(this.props.url);
                this.manager.close();
            } else {
                Alert.alert(`Unsupported URL: ${this.props.url}`);
            }
        }
    }
    renderModal() {
        const {url, children, onClose} = this.props;

        return <ModalContainer>

            <ModalHeader title="Open Link" />

            <ModalBody style={styles.body}>
                <Text>{
                    isPlatformWeb ?
                    "You are about to open a new tab to the following page:" :
                    "The following link is about to be opened:"
                }</Text>
                <Text style={styles.url}>{url}</Text>
                {children && <View>{children}</View>}
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <View style={styles.footerButton}>
                    <Button title="OK" onClick={this.goToUrl} square />
                </View>
                <View style={styles.footerButton}>
                    <Button title="Cancel" onClick={onClose} square />
                </View>
            </ModalFooter>

        </ModalContainer>;
    }
}

const styles = StyleSheet.create({
    body: {
        padding: 10,
    },
    url: {
        textAlign: "center",
        borderWidth: 2,
        padding: 5,
        marginTop: 15,
        backgroundColor: Color.Grey,
        color: Color.White,
    },
    footer: {
        flexDirection: "row",
    },
    footerButton: {
        flex: 1,
    },
});
