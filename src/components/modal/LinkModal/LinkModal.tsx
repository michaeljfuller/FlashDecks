import React from "react";
import {Alert, Linking, Text, View, StyleSheet} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps, extractModalProps} from "../core/Modal";
import {ModalHeader, ModalBody, ModalFooter} from "../parts";
import {Color} from "../../../styles/Color";
import {isPlatformWeb} from "../../../platform";

export type LinkModalProps = {
    url: string;
} & ModalProps;

//<editor-fold desc="TestID">
export function getModalHeaderTestID(testID?: string): string|undefined {
    return testID ? (testID+":header") : undefined;
}
export function getModalBodyTestID(testID?: string): string|undefined {
    return testID ? (testID+":body") : undefined;
}
export function getModalFooterTestID(testID?: string): string|undefined {
    return testID ? (testID+":footer") : undefined;
}
export function getModalOkButtonTestID(testID?: string): string|undefined {
    return testID ? (testID+":ok") : undefined;
}
export function getModalCancelButtonTestID(testID?: string): string|undefined {
    return testID ? (testID+":cancel") : undefined;
}
//</editor-fold>

/**
 * Prompt the user to follow a link.
 */
export class LinkModal extends React.PureComponent<LinkModalProps> {
    goToUrl = async () => {
        if (isPlatformWeb) {
            window.open(this.props.url, '_blank');
        } else {
            const supported = await Linking.canOpenURL(this.props.url);
            if (supported) {
                await Linking.openURL(this.props.url);
                this.props.onClose();
            } else {
                Alert.alert(`Unsupported URL: ${this.props.url}`);
            }
        }
    }

    render() {
        const {url, children, onClose, testID} = this.props;

        return <Modal {...extractModalProps(this.props)}>

            <ModalHeader testID={getModalHeaderTestID(testID)} title="Open Link" />

            <ModalBody testID={getModalBodyTestID(testID)} style={styles.body}>
                <Text>{
                    isPlatformWeb ?
                    "You are about to open a new tab to the following page:" :
                    "The following link is about to be opened:"
                }</Text>
                <Text style={styles.url}>{url}</Text>
                {children && <View>{children}</View>}
            </ModalBody>

            <ModalFooter testID={getModalFooterTestID(testID)} style={styles.footer}>
                <Button testID={getModalOkButtonTestID(testID)}
                    title="OK" style={styles.footerButton} onClick={this.goToUrl} square
                />
                <Button testID={getModalCancelButtonTestID(testID)}
                    title="Cancel" style={styles.footerButton} onClick={onClose} square
                />
            </ModalFooter>

        </Modal>;
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
