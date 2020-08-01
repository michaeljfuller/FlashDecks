import React from "react";
import {View, StyleSheet} from "react-native";
import Tag from "../../tag/Tag";
import {DeckModel} from "../../../models";

export interface DeckInfoModelTagsProps {
    deck: DeckModel;
}

export function DeckInfoModelTags(props: DeckInfoModelTagsProps) {
    const {deck} = props;
    const {tags=[]} = deck || {};
    if (tags.length) {
        return <View style={styles.tags}>
            {tags.map(tag => <Tag key={tag} value={tag} />)}
        </View>;
    }
    return null;
}

const styles = StyleSheet.create({
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
});
