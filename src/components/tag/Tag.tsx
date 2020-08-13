import React, {useCallback} from "react";
import {withStyles} from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import {DefaultTheme} from "../../styles/UIColorTheme";
import {TagProps} from "./Tag.common";

const theme = DefaultTheme;

export default function Tag(props: TagProps) {
    const {value, onDelete} = props;

    const onClickDelete = useCallback(() => {
        onDelete && onDelete(value);
    }, [onDelete, value]);

    return <StyledChip
        label={value}
        size="small"
        onDelete={onDelete ? onClickDelete : undefined}
    />;
}

const StyledChip = withStyles({
    root: {
        color: theme.secondary.base,
        backgroundColor: theme.primary.base,
        margin: 1
    }
})(Chip) as typeof Chip;
