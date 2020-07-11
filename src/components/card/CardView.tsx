import React, {useState} from "react";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import {Color} from "../../styles/Color";
import CardSide from "./CardSide/CardSide";
import {CardViewProps} from "./CardView.common";

export default function CardView(props: CardViewProps) {
    const [sideIndex, setSideIndex] = useState(0);
    const sides = props.item?.sides || [];
    const side = sides[sideIndex];
    const onPress = () => setSideIndex((sideIndex + 1) % (sides.length || 1));
    const footerText = sides.length > 1 ? `${sideIndex+1}/${sides.length}` : '';

    return <View style={props.style}>
        <StyledCard variant="elevation" raised={true} elevation={5}>
            <View style={styles.inner}>

                <StyledCardHeader
                    title={props.item?.name || "Unknown"}
                    titleTypographyProps={{ style: { userSelect: "none" } }}
                />

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.body}>
                    <CardSide side={side} style={styles.side} onPress={onPress} />
                </ScrollView>

            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{footerText}</Text>
            </View>
        </StyledCard>
    </View>;
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
    },
    side: {
        height: '100%',
    },
    footer: {},
    footerText: {
        marginHorizontal: "auto",
        lineHeight: sideCountHeight,
        fontSize: sideCountHeight,
    },
});
