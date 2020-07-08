import React from "react";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import {CardViewProps} from "./CardView.common";
import {withStyles} from "@material-ui/core/styles";
import {Color} from "../../styles/Color";

export default function CardView(props: CardViewProps) {
    return <View style={props.style}>
        <StyledCard variant="elevation" raised={true} elevation={5}>
            <View style={styles.inner}>

                <StyledCardHeader
                    title={props.item?.name || "Unknown"}
                    titleTypographyProps={{ style: { userSelect: "none" } }}
                />

                <ScrollView style={styles.body}>
                    <View style={styles.content}>
                        <Text style={{ fontSize: 10 }} selectable={false}>{JSON.stringify(props.item, null, 2)}</Text>
                    </View>
                </ScrollView>

            </View>
        </StyledCard>
    </View>;
}

const edgeRadius = 15;
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
    body: {
        borderColor: Color.Grey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    content: {
        backgroundColor: Color.White,
    },
});
