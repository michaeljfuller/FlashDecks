import React from "react";
import {Text, View} from "react-native";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import {CardViewProps} from "./CardView.common";
import {withStyles} from "@material-ui/core/styles";

export default function CardView(props: CardViewProps) {
    return <View style={props.style}>
        <StyledCard>

            <StyledCardHeader
                title="CardView"
            />

            <StyledCardContent>
                <Text style={{ fontSize: 10 }}>{JSON.stringify(props.item, null, 2)}</Text>
            </StyledCardContent>

        </StyledCard>
    </View>;
}

const StyledCard = withStyles({
    root: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 15,
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
        '&:last-child': { paddingBottom: 5 }
    }
})(CardContent) as typeof CardContent;
