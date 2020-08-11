import React, {useCallback, useState} from "react";
import {View, StyleSheet, TextInput} from "react-native";
import Tag from "../../tag/Tag";
import IconButton, {IconType} from "../../button/IconButton";
import PromptModal from "../../modal/PromptModal/PromptModal";

export interface DeckInfoModelTagsProps {
    tags?: string[];
    editable?: boolean;
    onChange?: (tags: string[]) => void;
}

export function DeckInfoModelTags(props: DeckInfoModelTagsProps) {
    const {tags=[], editable=false, onChange} = props;
    const [openAddTagModal, setOpenAddTagModal] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const onOpenInput = useCallback(() => {
        setOpenAddTagModal(true);
    }, []);

    const onAddInput = useCallback(() => {
        setOpenAddTagModal(false);
        if (onChange) onChange([...tags, tagInput]);
        setTagInput('');
    }, [tagInput, tags, onChange]);

    const onCancelInput = useCallback(() => {
        setOpenAddTagModal(false);
        setTagInput('');
    }, []);

    if (tags.length) {
        return <View style={styles.tags}>
            {tags.map(tag => <Tag key={tag} value={tag} />)}
            {editable && <IconButton icon={IconType.Add} onClick={onOpenInput} />}

            <PromptModal
                title="Add Tag"
                message="Enter a new tag."
                style={styles.modal}
                open={openAddTagModal}
                onOk={onAddInput}
                onClose={onCancelInput}
                enabledOk={tagInput.length > 0}
            >
                <TextInput value={tagInput} onChangeText={setTagInput} style={styles.tagInput} />
            </PromptModal>
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
    tagInput: {
        borderWidth: 1,
        marginVertical: 2,
        padding: 2,
        minWidth: 100,
    },
    modal: {
        minHeight: undefined,
        minWidth: undefined,
    },
});
