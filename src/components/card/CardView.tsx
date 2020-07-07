import React from "react";
import {Text, View} from "react-native";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import {CardViewProps} from "./CardView.common";
import {withStyles} from "@material-ui/core/styles";
import {Color} from "../../styles/Color";

export default function CardView(props: CardViewProps) {
    return <View style={props.style}>
        <StyledCard variant="elevation" raised={true} elevation={5}>

            <StyledCardHeader
                title={props.item?.name || "Unknown"}
                titleTypographyProps={{ style: { userSelect: "none" } }}
            />

            <StyledCardContent>
                <Text style={{ fontSize: 10 }} selectable={false}>{JSON.stringify(props.item, null, 2)}</Text>
            </StyledCardContent>

        </StyledCard>
    </View>;
}

const StyledCard = withStyles({
    root: {
        flex: 1,
        padding: 5,
        paddingTop: 0,
        marginBottom: 5,
        borderRadius: 15,
        backgroundColor: Color.White,
        borderColor: Color.Grey,
    }
})(Card) as typeof Card;

const StyledCardHeader = withStyles({
    root: {
        padding: 7,
        paddingBottom: 0,
        textAlign: 'center'
    }
})(CardHeader) as typeof CardHeader;

const StyledCardContent = withStyles({
    root: {
        padding: 5,
        paddingTop: 0,
        paddingBottom: 0,
    }
})(CardContent) as typeof CardContent;
