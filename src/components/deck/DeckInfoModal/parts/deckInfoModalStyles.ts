import {StyleSheet} from "react-native";

const titleInputHeight = 25;
export const styles = StyleSheet.create({
    titleInputRow: {
        flexDirection: "row",
        marginBottom: 2,
    },
    titleLabel: {
        lineHeight: titleInputHeight,
    },
    titleInput: {
        padding: 2,
        marginLeft: 5,
        flex: 1,
        height: titleInputHeight,
        borderWidth: 1,
    },
    descriptionInput: {
        padding: 2,
        margin: 2,
        borderWidth: 1,
    },
    footer: {
        flexDirection: "row",
        width: "100%",
    },
    footerItem: {
        flex: 1,
    },
});
