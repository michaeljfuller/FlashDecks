import React from "react";
import {ScrollView, Text, View, StyleSheet, ViewStyle} from "react-native";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import globalStyles from "../../styles/globalStyleSheet";
import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewBase, CardViewBaseState} from "./CardView.common";
import TextButton from "../button/TextButton";
import IconButton, {IconType} from "../button/IconButton";

const edgeRadius = 15;
const sideCountHeight = edgeRadius-2;
const headerHeight = 35;
const footerHeight = edgeRadius;
const borderWidth = 1;
const marginBottom = 5;

interface CardViewState extends CardViewBaseState {
    editing?: boolean;
}

export default class CardView extends CardViewBase<CardViewState> {

    onClickEdit = () => this.setState({ editing: true });
    onClickCancel = () => this.setState({ editing: false });
    onClickDone = () => this.setState({ editing: false });

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
                            height={bodyHeight}
                            editing={this.props.editable}
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
        if (this.state.editing) {
            const margin = 1;
            return <View style={styles.headerActions}>
                <IconButton icon={IconType.Done} onClick={this.onClickDone} style={{ margin }} />
                <IconButton icon={IconType.Cancel} onClick={this.onClickCancel} style={{ margin }} />
            </View>;
        } else {
            return <View style={styles.headerActions}>
                <TextButton title="Edit" onClick={this.onClickEdit} style={{ height: headerHeight-8 }} />
            </View>;
        }
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
        right: 5,
        top: 5,
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
