import React from "react";
import {ScrollView, Text, View, StyleSheet, ViewStyle} from "react-native";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewBase} from "./CardView.common";

const edgeRadius = 15;
const sideCountHeight = edgeRadius-2;
const headerHeight = 35;
const footerHeight = edgeRadius;
const borderWidth = 1;
const marginBottom = 5;

export default class CardView extends CardViewBase {
    render() {
        const totalHeight = this.state.viewLayout.height;
        const bodyHeight = Math.max(0, totalHeight - (headerHeight + footerHeight + marginBottom + borderWidth * 2));
        const footerText = this.sides.length > 1 ? `${this.state.sideIndex+1}/${this.sides.length}` : '';

        return <View style={this.props.style} onLayout={this.onLayout}>
            <StyledCard variant="elevation" raised={true} elevation={5}>
                <View style={styles.inner}>

                    <StyledCardHeader title={this.card?.name || "Unknown"}/>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.body}>
                        <CardSide
                            side={this.currentSide}
                            onPress={this.onPress}
                            height={bodyHeight}
                            style={[styles.side, this.sides.length > 1 ? styles.pointer : null]}
                        />
                    </ScrollView>

                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{footerText}</Text>
                </View>
            </StyledCard>
        </View>;
    }
}

const StyledCard = withStyles({
    root: {
        flex: 1,
        flexDirection: "column",
        padding: 0,
        paddingBottom: footerHeight,
        borderRadius: edgeRadius,
        marginBottom,
        backgroundColor: Color.OffWhite,
    }
})(Card) as typeof Card;

const StyledCardHeader = withStyles({
    root: {
        padding: 0,
        textAlign: 'center',
        minHeight: headerHeight,
    }
})(CardHeader) as typeof CardHeader;

const styles = StyleSheet.create({
    inner: {
        flexDirection: "column",
        height: '100%',
    },
    scrollView: {
        borderColor: Color.Grey,
        borderTopWidth: borderWidth,
        borderBottomWidth: borderWidth,
        backgroundColor: Color.White,
    },
    body: {
        flex: 1,
        userSelect: "none",
    } as ViewStyle & { userSelect: string },
    side: {
        height: "100%",
    },
    pointer: {
        cursor: "pointer",
    } as ViewStyle & { cursor: string },
    footer: {},
    footerText: {
        marginHorizontal: "auto",
        lineHeight: sideCountHeight,
        fontSize: sideCountHeight,
    },
});
