import React, {useCallback} from "react";
import {StyleSheet} from 'react-native';
import {Badge, Text} from 'native-base';
import {DefaultTheme} from "../../styles/UIColorTheme";
import {TagProps} from "./Tag.common";
import IconButton, {IconType} from "../button/IconButton";

const theme = DefaultTheme;

export default function Tag(props: TagProps) {
    const {value, onDelete} = props;

    const onClickDelete = useCallback(() => {
        onDelete && onDelete(value);
    }, [onDelete, value]);

    return <Badge style={styles.badge}>
        <Text style={{ color: theme.secondary.base }}>{props.value}</Text>
        {onDelete && <IconButton icon={IconType.Cancel} width={18} height={26} onClick={onClickDelete} />}
    </Badge>;
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: theme.primary.base,
        margin: 1,
        flexDirection: "row",
    },
});
