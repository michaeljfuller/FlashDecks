import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import {DefaultTheme} from "../../styles/UIColorTheme";
import {TagProps} from "./Tag.common";

const theme = DefaultTheme;

export default function Tag(props: TagProps) {
    return <StyledChip
        label={props.value}
        size="small"
    />;
}

const StyledChip = withStyles({
    root: {
        color: theme.secondary.base,
        backgroundColor: theme.primary.base,
        margin: 1
    }
})(Chip) as typeof Chip;
