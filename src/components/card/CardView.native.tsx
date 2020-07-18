import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewBase} from "./CardView.common";

const edgeRadius = 15;
const sideCountPadding = 2;
const sideCountHeight = edgeRadius - sideCountPadding;
const titleHeight = 20;
const headerHeight = edgeRadius + titleHeight;
const footerHeight = edgeRadius;
const borderWidth = 1;

export default class CardView extends CardViewBase {
    render() {
        const totalHeight = this.state.viewLayout.height;
        const bodyHeight = Math.max(0, totalHeight - (headerHeight + footerHeight + borderWidth * 2));
        const footerText = this.sides.length > 1 ? `${this.state.sideIndex+1}/${this.sides.length}` : '';

        return <View style={[styles.root, this.props.style]} onLayout={this.onLayout}>
            <Text style={styles.title}>{this.props.item.name}</Text>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.body, { minHeight: bodyHeight || undefined }]}
                persistentScrollbar={true}
            >
                <CardSide side={this.currentSide} height={bodyHeight} style={{ minHeight: bodyHeight || undefined }} onPress={this.onPress} />
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{footerText}</Text>
            </View>
        </View>;
    }
}

const borderColor = Color.Grey;
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
        fontSize: titleHeight,
        lineHeight: titleHeight,
        borderBottomWidth: borderWidth,
        borderColor,
    },
    scrollView: {
        backgroundColor: Color.White,
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 1,
    },
    body: {
    },
    footer: {
        height: footerHeight,
        borderTopWidth: borderWidth,
        borderColor,
    },
    footerText: {
        textAlign: "center",
        paddingVertical: sideCountPadding,
        lineHeight: sideCountHeight,
        fontSize: sideCountHeight,
    },
});
