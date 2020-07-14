import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewBase} from "./CardView.common";

export default class CardView extends CardViewBase {
    onPress = () => this.nextSide();

    render() {
        const footerText = this.sides.length > 1 ? `${this.state.sideIndex+1}/${this.sides.length}` : '';

        return <View style={[styles.root, this.props.style]}>
            <Text style={styles.title}>CardView</Text>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.body} persistentScrollbar={true}>
                <CardSide side={this.currentSide} style={styles.side} onPress={this.onPress} />
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{footerText}</Text>
            </View>
        </View>;
    }
}

const edgeRadius = 15;
const sideCountPadding = 2;
const sideCountHeight = edgeRadius-sideCountPadding;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.OffWhite,
        paddingTop: edgeRadius,
        borderRadius: edgeRadius,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 20,
    },
    scrollView: {
        borderColor: Color.Grey,
        backgroundColor: Color.White,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: "column",
    },
    body: {
        flex: 1,
    },
    side: {
        height: '100%',
    },
    footer: {
        // backgroundColor: 'blue',
        height: edgeRadius,
    },
    footerText: {
        textAlign: "center",
        paddingVertical: sideCountPadding,
        lineHeight: sideCountHeight,
        fontSize: sideCountHeight,
    },
});
