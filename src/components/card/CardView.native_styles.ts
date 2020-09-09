import {StyleSheet} from "react-native";
import {Color} from "../../styles/Color";

export const edgeRadius = 15;
export const sideCountPadding = 2;
export const sideCountHeight = edgeRadius - sideCountPadding;
export const titleHeight = 20;
export const headerHeight = edgeRadius + titleHeight;
export const footerHeight = edgeRadius;
export const borderWidth = 1;

export const borderColor = Color.Grey;
export const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.OffWhite,
        borderRadius: edgeRadius,
    },
    headerRow: {},
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
        borderBottomWidth: borderWidth,
        borderColor,
    },
    scrollView: {
        backgroundColor: Color.White,
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 1,
    },
    body: {
    },
    footer: {
        height: footerHeight,
        borderTopWidth: borderWidth,
        borderColor,
    },
    footerText: {
        textAlign: "center",
        paddingVertical: sideCountPadding,
        lineHeight: sideCountHeight,
        fontSize: sideCountHeight,
    },
});
