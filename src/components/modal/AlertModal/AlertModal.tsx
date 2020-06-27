import {ModalProps} from "../createModals";
import {Text, View, ScrollView} from "react-native";
import React from "react";
import Button from "../../button/Button";
import {DefaultTheme, Color} from "../../../styles/UIColorTheme";

const theme = DefaultTheme;

export type AlertModalProps = ModalProps<{
    title?: string;
    message?: string;
}>;

export default function AlertModal(props: AlertModalProps) {
    const {title, message} = props.payload || {};
    return <View
        style={{ backgroundColor: Color.White }}
    >

        {title && <View style={{
            backgroundColor: theme.primary.base,
        }}>
            <Text style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: theme.secondary.base,
            }}>{title}</Text>
        </View>}

        <ScrollView style={{
            padding: 2
        }}>
            {message && <Text>{message}</Text>}
            <View>{props.children}</View>
        </ScrollView>

        <Button title="Close" onClick={props.close}/>

    </View>
}
