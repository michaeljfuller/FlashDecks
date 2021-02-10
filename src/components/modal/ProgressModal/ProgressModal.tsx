import React, {PropsWithChildren} from "react";
import {StyleSheet, Text, View, ViewStyle} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps, extractModalProps} from "../core/Modal";
import {ModalHeader, ModalBody, ModalFooter} from "../parts";
import ProgressCircle from "../../progress/ProgressCircle";
import ProgressBar from "../../progress/ProgressBar";
import Column from "../../layout/Column";

type SpinnerType = 'bar'|'circle';

export type ProgressModalProps = {
    /** A title to add to the modal. */
    title?: string;
    /** The message to add to the modal. */
    message?: string;
    /** The message to add to the modal. */
    footer?: string;
    /** If the spinner should appear, or number for deterministic progress. */
    value: boolean|number;
    /** Defines the range of value, if it is a number. */
    maxValue?: number;
    /** If progress is represented by a bar or circle. */
    type?: SpinnerType;
    /** If there should be a close button. */
    closeButton?: boolean;
    /** Text on the close button. */
    closeButtonText?: string;

    bodyStyle?: ViewStyle;
} & ModalProps;
export type ProgressModalPropsWithChildren = PropsWithChildren<ProgressModalProps>;

/**
 * A modal with a progress bar/spinner.
 */
export const ProgressModal = React.memo<ProgressModalPropsWithChildren>(function ProgressModal(props: ProgressModalPropsWithChildren) {
    const {
        title,
        message,
        footer,
        value=true,
        maxValue,
        type='bar',
        onClose,
        children,
        bodyStyle,
        closeButton=false,
        closeButtonText="Close",
    } = props;
    return <Modal {...extractModalProps(props)}>
        <ModalHeader title={title || 'Progress'} />

        <ModalBody style={bodyStyle}>
            {message && <Text style={styles.message}>{message}</Text>}
            {children && <View>{children}</View>}

            {type === 'circle' && <ProgressCircle
                render={typeof value === "number" ? true : value}
                value={typeof value === "number" ? value : undefined}
                maxValue={maxValue}
                size={60}
                style={styles.progressCircle}
            />}
            {type === 'bar' && <ProgressBar
                render={typeof value === "number" ? true : value}
                value={typeof value === "number" ? value : undefined}
                maxValue={maxValue}
                style={styles.progressBar}
            />}
            {footer && <Text style={styles.footerText}>{footer}</Text>}
        </ModalBody>

        {closeButton ? <ModalFooter><Button title={closeButtonText} onClick={onClose} square /></ModalFooter> : null}
    </Modal>;
});

const styles = StyleSheet.create({
    progressCircle: {
        alignSelf: "center",
        marginVertical: 5,
    },
    message: { textAlign: "center" },
    progressBar: { marginVertical: 5 },
    footerText: { textAlign: "center" },
});
