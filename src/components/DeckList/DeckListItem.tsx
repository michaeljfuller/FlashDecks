import React from "react";

import {makeStyles} from '@material-ui/core/styles';
import UICard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardCardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IconButton, {IconType} from "../button/IconButton";
import {DeckListItemProps} from "./DeckListItem.common";
import {repeat} from "../../utils/array";
import Avatar from "../avatar/Avatar";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 5
    }
});

export default function DeckListItem(props: DeckListItemProps) {
    const classes = useStyles();

    const {deck, showActions, onActions, onClick} = props;
    const {owner} = deck;

    // TODO Custom Avatar component
    const actionsButton = showActions ? <IconButton
        transparent
        icon={IconType.More}
        onClick={onActions ? (event => onActions(deck, event)) : undefined}
    /> : null;

    return <UICard className={classes.root}>
        <CardHeader
            avatar={<Avatar user={owner} />}
            action={actionsButton}
            title={deck.name}
            subheader={owner.displayName}
        />
        <CardCardActionArea
            onClick={onClick ? (event => onClick(deck, event)) : undefined}
            disabled={!onClick}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {deck.id}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {deck.description}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">{ repeat(
                    // Math.floor(Math.random() * 15) + 1,
                    parseInt(deck.id.split('-').pop() || '')-1 || 0,
                    i => `Test sentence number #${i+1} for testing varying paragraph lengths across all decks.`
                ).join(' ')}</Typography>
            </CardContent>
        </CardCardActionArea>
    </UICard>;
}
