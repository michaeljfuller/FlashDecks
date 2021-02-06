import React from "react";
import {StyleSheet, Text} from "react-native";

export class ForgotPassword extends React.PureComponent {
    render() {
        return <Text style={styles.title}>Forgot Password - TODO</Text>;
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
        color: "red",
    },
});
