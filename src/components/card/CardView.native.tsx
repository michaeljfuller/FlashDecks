import React from "react";
import {Text, View, ScrollView, StyleSheet, LayoutChangeEvent, LayoutRectangle} from "react-native";
import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewBase, CardViewState} from "./CardView.common";

const edgeRadius = 15;
const sideCountPadding = 2;
const sideCountHeight = edgeRadius - sideCountPadding;
const titleHeight = 20;
const headerHeight = edgeRadius + titleHeight;
const footerHeight = edgeRadius;
const borderWidth = 1;

export interface CardViewNativeState extends CardViewState {
    viewLayout: LayoutRectangle;
}
export default class CardView extends CardViewBase<CardViewNativeState> {
    state = {
        sideIndex: 0,
        viewLayout: { x: 0, y: 0, width: 0, height: 0 },
    } as CardViewNativeState;

    onLayout = (event: LayoutChangeEvent) => {
        this.setState({ viewLayout: event.nativeEvent.layout });
    }

    onPress = () => this.nextSide();

    render() {
        const viewLayoutHeight = this.state.viewLayout.height;
        const minBodyHeight = Math.max(0, viewLayoutHeight - (headerHeight + footerHeight + borderWidth * 2));
        const footerText = this.sides.length > 1 ? `${this.state.sideIndex+1}/${this.sides.length}` : '';

        return <View style={[styles.root, this.props.style]} onLayout={this.onLayout}>
            <Text style={styles.title}>CardView</Text>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.body, { minHeight: minBodyHeight || undefined }]}
                persistentScrollbar={true}
            >
                <CardSide side={this.currentSide} style={{ minHeight: minBodyHeight || undefined }} onPress={this.onPress} />
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
