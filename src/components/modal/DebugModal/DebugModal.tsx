import {ModalProps} from "../createModals";
import {Text, View, ScrollView} from "react-native";
import React from "react";
import Button from "../../button/Button";
import {UIColorThemeKey, UIColorThemeMap} from "../../../styles/UIColorTheme";

const theme = UIColorThemeMap.Grey;

export default function DebugModal(props: ModalProps) {
    return <View style={{
        backgroundColor: theme.secondary.base,
        maxHeight: 500,
        minWidth: 200,
    }}>
        <View style={{ backgroundColor: theme.primary.base, }}>
            <Text style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: theme.secondary.base
            }}>{props.modalKey}</Text>
        </View>

        <ScrollView style={{
            padding: 5,
        }}>
            <View>{props.children}</View>
            <View style={{
                borderWidth: 1,
                borderColor: 'grey',
                padding: 2,
                margin: 2,
            }}>
                <Text>{JSON.stringify(props.payload, null, 2)}</Text>
            </View>
        </ScrollView>

        <Button title="Close" onClick={props.close} color={UIColorThemeKey.Grey} />
    </View>
}
