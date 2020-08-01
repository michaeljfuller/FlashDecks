import React, {PropsWithChildren} from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from "react-native";
import {DefaultTheme} from "../../../../styles/UIColorTheme";
import Avatar from "../../../avatar/Avatar";
import {UserModel} from "../../../../models";

export const theme = DefaultTheme;
const avatarSize = 30;
const headerPadding = 5;

export interface ModalHeaderProps {
    title?: string;
    user?: UserModel|null;
    style?: ViewStyle;
}

export function ModalHeader(props: PropsWithChildren<ModalHeaderProps>) {
    const userAvatar = props.user !== undefined && <Avatar user={props.user} size={avatarSize} style={styles.avatarView} />;

    const viewStyle: ViewStyle = {
        minHeight: userAvatar ? avatarSize + headerPadding * 2 : undefined
    };
    const titleStyle: TextStyle = {
        lineHeight: userAvatar ? avatarSize : undefined
    };

    return <View style={[styles.root, viewStyle, props.style]}>
        <Text style={[styles.title, titleStyle]}>{props.title}</Text>
        {userAvatar}
        {props.children}
    </View>;
}
export default ModalHeader;

const styles = StyleSheet.create({
    root: {
        backgroundColor: theme.primary.base,
        padding: headerPadding,
    },
    title: {
        color: theme.secondary.base,
        textAlign: "center",
        fontWeight: 'bold',
    },
    avatarView: {
        position: "absolute",
        top: headerPadding,
        right: headerPadding,
    },
});
