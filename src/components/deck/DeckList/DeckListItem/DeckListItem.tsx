import React, {useCallback} from "react";

import {makeStyles} from '@material-ui/core/styles';
import UICard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardCardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IconButton, {IconType} from "../../../button/IconButton";
import {DeckListItemProps} from "./DeckListItem.common";
import {repeat} from "../../../../utils/array";
import Avatar from "../../../avatar/Avatar";
import {Color, UIColorThemeMap} from "../../../../styles/UIColorTheme";
import Fadeout from "../../../layout/Fadeout";

const contentBackgroundColor = Color.White;

export const listItemMaxWidth = 345;
export const listItemMaxHeight = 345;
export const listItemActionMaxHeight = 165;

const headerTheme = UIColorThemeMap.Blue;
const useStyles = makeStyles({
    root: {
        maxWidth: listItemMaxWidth,
        margin: 0
    },
    header: {
        backgroundColor: headerTheme.primary.base,
        color: headerTheme.secondary.base,
    },
    content: {
        padding: 5,
        backgroundColor: contentBackgroundColor,
    },
});

/**
 * An item in DeckList representing a Deck.
 */
export function DeckListItem(props: DeckListItemProps) {
    const classes = useStyles();

    const {deck, showActions, onActions, onClick} = props;
    const {owner} = deck;

    const handleOnActions = useCallback(
        event => onActions && onActions(deck, event),
        [deck, onActions],
    );
    const handleOnClick = useCallback(
        event => onClick && onClick(deck, event),
        [deck, onClick]
    );

    // Button to show actions
    const actionsButton = showActions ? <IconButton
        icon={IconType.More}
        onClick={handleOnActions}
        disabled={!onActions}
        color="Blue" invertColor={true}
    /> : null;

    return <UICard className={classes.root}>
        <CardHeader
            className={classes.header}
            avatar={<Avatar user={owner} />}
            action={actionsButton}
            title={deck.title}
            subheader={owner?.displayName || ''}
        />
            <CardCardActionArea onClick={handleOnClick} disabled={!onClick} >
                <Fadeout maxHeight={listItemActionMaxHeight} fadeColor={contentBackgroundColor}>
                    <CardContent className={classes.content}>
                        <Typography variant="body1" component="p">
                            {deck.description || 'No Description.'}
                        </Typography>
                    </CardContent>
                </Fadeout>
            </CardCardActionArea>
    </UICard>;
}
export default DeckListItem;
