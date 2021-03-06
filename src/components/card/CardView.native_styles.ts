import {StyleSheet} from "react-native";
import {Color, DisabledColor} from "../../styles/Color";

export const edgeRadius = 15;
export const titleHeight = 20;
export const headerHeight = edgeRadius + titleHeight;
export const footerHeight = 43 - edgeRadius;
export const borderWidth = 1;

export const borderColor = Color.Grey;
export const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.OffWhite,
        borderRadius: edgeRadius,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Color.OffWhite,
        borderBottomWidth: borderWidth,
        borderColor,
    },
    headerDisabled: {
        backgroundColor: DisabledColor.OffWhite,
    },
    renameButton: {
        position: "absolute",
        right: -30,
        top: 5,
    },
    headerActions: {
        flexDirection: "row",
        position: "absolute",
        right: 0,
    //  top: 0,
    },
    headerActionIconButtons: {
        top: 5,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: titleHeight,
        lineHeight: headerHeight,
    },
    scrollView: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 1,
    },
    body: {
        backgroundColor: Color.White,
    },
    bodyDisabled: {
        backgroundColor: DisabledColor.White,
    },
    footer: {
        height: footerHeight,
        borderTopWidth: borderWidth,
        backgroundColor: Color.OffWhite,
        borderColor,
    },
    footerDisabled: {
        backgroundColor: DisabledColor.OffWhite,
    },
    footerText: {
        textAlign: "center",
        lineHeight: footerHeight,
        fontSize: 14,
    },
});
