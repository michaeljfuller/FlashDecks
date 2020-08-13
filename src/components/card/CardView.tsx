import React from "react";
import {ScrollView, Text, View, StyleSheet, ViewStyle} from "react-native";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import globalStyles from "../../styles/globalStyleSheet";
import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import CardViewBase from "./CardView.common";
import CardSideActions from "./CardSide/CardSideActions";

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

                    <View>
                        <StyledCardHeader title={this.card?.name || "Unknown"}/>
                        {this.hasActions ? this.renderHeaderActions() : null}
                    </View>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.body}>
                        <CardSide
                            side={this.currentSide}
                            onPress={this.onPress}
                            onModifications={this.onSideChange}
                            height={bodyHeight}
                            editing={this.state.editing}
                            style={[styles.side, this.canPress ? globalStyles.pointer : null]}
                        />
                    </ScrollView>

                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{footerText}</Text>
                </View>

            </StyledCard>
        </View>;
    }

    renderHeaderActions() {
        return <View style={styles.headerActions}>
            <CardSideActions
                editing={this.state.editing || false}
                onPressDone={this.state.modifiedCard ? this.onClickDone : undefined}
                onPressCancel={this.onClickCancel}
                onPressEdit={this.onClickEdit}
                onPressAddBefore={this.onAddBefore}
                onPressAddAfter={this.onAddAfter}
                onPressDelete={this.onDelete}
            />
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
    headerActions: {
        flexDirection: "row",
        position: "absolute",
        right: 0,
        top: 0,
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
    footer: {},
    footerText: {
        marginHorizontal: "auto",
        lineHeight: sideCountHeight,
        fontSize: sideCountHeight,
    },
});
