import React from "react";
import {ScrollView, Text, View, StyleSheet, ViewStyle} from "react-native";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewBase} from "./CardView.common";

export default class CardView extends CardViewBase {
    onPress = () => this.nextSide();

    render() {
        const footerText = this.sides.length > 1 ? `${this.state.sideIndex+1}/${this.sides.length}` : '';

        return <View style={this.props.style}>
            <StyledCard variant="elevation" raised={true} elevation={5}>
                <View style={styles.inner}>

                    <StyledCardHeader title={this.card?.name || "Unknown"}/>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.body}>
                        <CardSide
                            side={this.currentSide}
                            onPress={this.onPress}
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

const edgeRadius = 15;
const sideCountHeight = edgeRadius-2;

const StyledCard = withStyles({
    root: {
        flex: 1,
        flexDirection: "column",
        padding: 0,
        paddingBottom: edgeRadius,
        borderRadius: edgeRadius,
        marginBottom: 5,
        backgroundColor: Color.OffWhite,
    }
})(Card) as typeof Card;

const StyledCardHeader = withStyles({
    root: {
        padding: 0,
        textAlign: 'center',
    }
})(CardHeader) as typeof CardHeader;

const styles = StyleSheet.create({
    inner: {
        flexDirection: "column",
        height: '100%',
    },
    scrollView: {
        borderColor: Color.Grey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
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
