import React from "react";
import {View} from "react-native";
import Modal from '@material-ui/core/Modal';
import {ModalRendererProps} from "./ModalRenderer.common";

export function ModalRenderer(props: ModalRendererProps) {

    const modals = Object.keys(props.modals).map(key => {
        const Template = props.modals[key];
        if (Template) {
            return <Modal
                key={key}
                open={key === props.modalKey}
                onClose={props.close}
            >
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: 10,
                    minHeight: 10,
                }}>
                    <Template
                        modalKey={key}
                        payload={props.payload}
                        close={props.close}
                    >{props.contents}</Template>
                </div>
            </Modal>;
        }
    })

    return <View style={{ flex: 1, flexDirection: 'column' }}>
        {modals}
        {props.background}
    </View>
}
export default ModalRenderer;
