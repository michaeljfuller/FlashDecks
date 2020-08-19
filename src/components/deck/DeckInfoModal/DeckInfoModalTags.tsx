import React, {useCallback, useState} from "react";
import {View, StyleSheet, TextInput} from "react-native";
import Tag from "../../tag/Tag";
import IconButton, {IconType} from "../../button/IconButton";
import PromptModal from "../../modal/PromptModal/PromptModal";
import {removeItem} from "../../../utils/array";
import {isPlatformWeb} from "../../../platform";

export interface DeckInfoModelTagsProps {
    tags?: string[];
    editable?: boolean;
    onChange?: (tags: string[]) => void;
}

export const DeckInfoModelTags = React.memo(function DeckInfoModelTags(props: DeckInfoModelTagsProps) {
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

    const onDelete = useCallback((tag: string) => {
        const index = tags.indexOf(tag);
        if (onChange && index >= 0) {
            onChange(removeItem(tags, index));
        }
    }, [tags, onChange]);

    if (tags.length) {
        return <View style={styles.tags}>
            {tags.map(tag => <Tag key={tag} value={tag} onDelete={editable ? onDelete : undefined} />)}
            {editable && <IconButton icon={IconType.Add} onClick={onOpenInput} height={isPlatformWeb ? undefined : 29} />}

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
});
export default DeckInfoModelTags;

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
