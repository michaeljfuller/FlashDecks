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
import {UIColorThemeMap} from "../../styles/UIColorTheme";

const headerTheme = UIColorThemeMap.Blue;
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 5
    },
    header: {
        backgroundColor: headerTheme.primary.base,
        color: headerTheme.secondary.base,
    }
});

/**
 * An item in DeckList representing a Deck.
 */
export default function DeckListItem(props: DeckListItemProps) {
    const classes = useStyles();

    const {deck, showActions, onActions, onClick} = props;
    const {owner} = deck;

    // Button to show actions
    const actionsButton = showActions ? <IconButton
        icon={IconType.More}
        onClick={onActions ? (event => onActions(deck, event)) : undefined}
        color={"White"}
    /> : null;

    return <UICard className={classes.root}>
        <CardHeader
            className={classes.header}
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
                <Typography variant="body1" component="p">
                    {deck.description}
                </Typography>
                {/* Sample text */}
                <Typography variant="body1" component="p">{ repeat(
                    parseInt(deck.id.split('-').pop() || '')-1 || 0,
                    i => `Test sentence number #${i+1} for testing varying paragraph lengths across all decks.`
                ).join(' ')}</Typography>
            </CardContent>
        </CardCardActionArea>
    </UICard>;
}
