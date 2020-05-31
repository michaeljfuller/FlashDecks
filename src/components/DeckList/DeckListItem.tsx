import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import UICard from '@material-ui/core/Card';
import CardCardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IconButton, {IconType} from "../button/IconButton";
import {DeckListItemProps} from "./DeckListItem.common";
import {DefaultTheme} from "../../styles/UIColorTheme";
import {repeat} from "../../utils/array";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 5
    },
    owner: {
        color: DefaultTheme.primary.base
    }
});

export default function DeckListItem(props: DeckListItemProps) {
    const classes = useStyles();
    const {deck, showActions} = props;
    const {owner} = deck;

    const onClick = () => props.onClick && props.onClick(deck);
    const onView  = () => props.onView  && props.onView (deck);
    const onEdit  = () => props.onEdit  && props.onEdit (deck);

    return <UICard className={classes.root}>
        <CardCardActionArea onClick={onClick} disabled={!props.onClick}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">{deck.name}</Typography>
                <Typography variant="body1" color="textSecondary" component="p">{deck.description}</Typography>
                <Typography className={classes.owner} variant="body2" color="textSecondary" component="p">{owner.displayName} (ID: {deck.ownerId})</Typography>
                {repeat(Math.floor(Math.random() * 5) + 1, i => <p key={i}>Height test #{i+1}.</p>)}
            </CardContent>
        </CardCardActionArea>
        {showActions && <CardActions>
            <IconButton text="View" icon={IconType.View} onClick={onView} />
            <IconButton text="Edit" icon={IconType.Edit} onClick={onEdit} />
        </CardActions>}
    </UICard>;
}
