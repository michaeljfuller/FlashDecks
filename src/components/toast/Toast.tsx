import React from "react";
import {Animated, Easing, Text, StyleSheet} from "react-native";
import {ToastBase, ToastType} from "./Toast.common";
import {GetUIColorThemeInput} from "../../styles/UIColorTheme";
import FullScreen from "../fullscreen/FullScreen";
import Button from "../button/Button";

export const TestIDs = {
    Root: 'toast-root',
    Title: 'toast-title',
    Text: 'toast-text',
    Button: 'toast-button',
}
export const ANIMATE_IN_DURATION = 500;

export class Toast extends ToastBase {
    opacityAnim = new Animated.Value(0.01);
    bottomAnim = new Animated.Value(-80);

    onShow() {
        super.onShow();
        this.setState({ enabled: false });
        const duration = ANIMATE_IN_DURATION;

        Animated.timing(this.bottomAnim, {
            toValue: 0, duration, useNativeDriver: false, easing: Easing.out(Easing.cubic)
        }).start();

        Animated.timing(this.opacityAnim, {
            toValue: 1, duration, useNativeDriver: false,
        }).start(() => this.setState({ enabled: true }));
    }
    render() {
        if (!this.props.show) return null;
        const {text, title, actionText = 'OK', type} = this.props;

        return <FullScreen
            testID={TestIDs.Root}
            style={styles.backdrop}
            contentStyle={styles.placement}
            onPress={this.onDismiss}
        >
            <Animated.View style={[ backgroundStyle(type), { opacity: this.opacityAnim, bottom: this.bottomAnim } ]}>
                {title ? <Text testID={TestIDs.Title} style={styles.title}>{title}</Text> : null}
                <Text testID={TestIDs.Text} style={styles.text}>{text}</Text>
                <Button
                    testID={TestIDs.Button}
                    title={actionText}
                    onClick={this.onAction}
                    style={styles.button}
                    color={buttonColor(type)}
                    height={30}
                    square
                />
            </Animated.View>
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
        opacity: 0,
    },
    backgroundSuccess: { backgroundColor: 'green' },
    backgroundWarning: { backgroundColor: 'orange' },
    backgroundError: { backgroundColor: 'red' },
    text: {
        color: 'white',
        paddingHorizontal: 2,
    },
    title: {
        color: 'white',
        fontWeight: "bold",
        letterSpacing: 1,
        paddingHorizontal: 2,
    },
    button: {
        marginTop: 3,
    }
});

