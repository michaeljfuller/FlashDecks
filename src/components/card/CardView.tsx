import React from "react";
import {Text} from "react-native";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import CardViewBase from "./CardView.common";
import {withStyles} from "@material-ui/core/styles";

export interface CardViewState {}
export default class CardView extends CardViewBase<CardViewState> {
    state: CardViewState = {};

    render() {
        return <StyledCard>

            <StyledCardHeader
                title="CardView"
            />

            <StyledCardContent>
                <Text style={{ fontSize: 10 }}>{JSON.stringify(this.props.item, null, 2)}</Text>
            </StyledCardContent>

        </StyledCard>;
    }
}

const StyledCard = withStyles({
    root: {
        padding: 10
    }
})(Card) as typeof Card;

const StyledCardHeader = withStyles({
    root: {
        padding: 0,
        textAlign: 'center'
    }
})(CardHeader) as typeof CardHeader;

const StyledCardContent = withStyles({
    root: {
        padding: 5,
        '&:last-child': { paddingBottom: 5 }
    }
})(CardContent) as typeof CardContent;
