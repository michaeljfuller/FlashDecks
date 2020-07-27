import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewBase} from "./CardView.common";
import IconButton, {IconType} from "../button/IconButton";
import TextButton from "../button/TextButton";

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

            <View style={styles.headerRow}>
                <Text style={styles.title}>{this.card?.name || "Unknown"}</Text>
                {this.hasActions ? this.renderHeaderActions() : null}
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.body, { minHeight: bodyHeight || undefined }]}
                persistentScrollbar={true}
            >
                <CardSide
                    side={this.currentSide}
                    onPress={this.onPress}
                    onModifications={this.onSideModifications}
                    height={bodyHeight}
                    editing={this.state.editing}
                    style={{ minHeight: bodyHeight || undefined }}
                />
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{footerText}</Text>
            </View>
        </View>;
    }

    renderHeaderActions() {
        if (this.state.editing) {
            const margin = 1;
            return <View style={[styles.headerActions, styles.headerActionIconButtons]}>
                <IconButton icon={IconType.Done} onClick={this.onClickDone} style={{ margin }} />
                <IconButton icon={IconType.Cancel} onClick={this.onClickCancel} style={{ margin }} />
            </View>;
        } else {
            return <View style={styles.headerActions}>
                <TextButton title="Edit" onClick={this.onClickEdit} style={{ height: headerHeight }} />
            </View>;
        }
    }
}

const borderColor = Color.Grey;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.OffWhite,
        borderRadius: edgeRadius,
    },
    headerRow: {},
    headerActions: {
        flexDirection: "row",
        position: "absolute",
        right: 5,
        // top: 5,
    },
    headerActionIconButtons: {
        top: 5,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: titleHeight,
        lineHeight: headerHeight,
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
