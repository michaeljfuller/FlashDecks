import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {ToastBase, ToastType} from "./Toast.common";
import {GetUIColorThemeInput} from "../../styles/UIColorTheme";
import FullScreen from "../fullscreen/FullScreen";
import Button from "../button/Button";

export class Toast extends ToastBase {
    render() {
        if (!this.props.show) return null;
        const {text, title, actionText = 'OK', type} = this.props;

        return <FullScreen style={styles.backdrop} contentStyle={styles.placement} onPress={this.onDismiss}>
            <View style={backgroundStyle(type)}>
                {title ? <Text style={styles.title}>{title}</Text> : null}
                <Text style={styles.text}>{text}</Text>
                <Button
                    title={actionText}
                    onClick={this.onAction}
                    style={styles.button}
                    color={buttonColor(type)}
                    height={30}
                    square
                />
            </View>
        </FullScreen>;
    }
}

function backgroundStyle(type?: ToastType) {
    switch (type){
        case "success": return [styles.background, styles.backgroundSuccess];
        case "warning": return [styles.background, styles.backgroundWarning];
        case "error": return [styles.background, styles.backgroundError];
    }
    return styles.background;
}

function buttonColor(type?: ToastType): GetUIColorThemeInput {
    switch (type){
        case "success": return "Green";
        case "warning": return "Orange";
        case "error": return "Red";
    }
    return undefined;
}

export default Toast;

const margin = 5;
const styles = StyleSheet.create({
    backdrop: {
        opacity: 0,
    },
    placement: {
        bottom: margin,
        left: margin,
        right: margin,
    },
    background: {
        marginHorizontal: 'auto',
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: 'black',
        padding: 5,
    },
    backgroundSuccess: { backgroundColor: 'green' },
    backgroundWarning: { backgroundColor: 'orange' },
    backgroundError: { backgroundColor: 'red' },
    text: { color: 'white' },
    title: {
        color: 'white',
        fontWeight: "bold",
        letterSpacing: 1,
    },
    button: {
        marginTop: 3,
    }
});

