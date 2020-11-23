import {StyleSheet, ViewStyle} from "react-native";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {Color} from "../../styles/Color";

export const edgeRadius = 15;
export const headerHeight = 35;
export const footerHeight = 42 - edgeRadius;
export const borderWidth = 1;
export const marginBottom = 5;

export const StyledCard = withStyles({
    root: {
        flex: 1,
        flexDirection: "column",
        padding: 0,
        paddingBottom: footerHeight,
        borderRadius: edgeRadius,
        marginBottom,
        backgroundColor: Color.OffWhite,
    }
})(Card) as typeof Card;

export const StyledCardHeader = withStyles({
    root: {
        padding: 0,
        textAlign: 'center',
        minHeight: headerHeight,
    }
})(CardHeader) as typeof CardHeader;

export const styles = StyleSheet.create({
    inner: {
        flexDirection: "column",
        height: '100%',
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "center",
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
        top: 0,
    },
    scrollView: {
        borderColor: Color.Grey,
        borderTopWidth: borderWidth,
        borderBottomWidth: borderWidth,
        backgroundColor: Color.White,
    },
    body: {
        flex: 1,
        userSelect: "none",
    } as ViewStyle & { userSelect: string },
    side: {
        height: "100%",
    },
    footer: {
    },
    footerText: {
        marginHorizontal: "auto",
        lineHeight: footerHeight,
        fontSize: 14,
    },
    deletePromptContent: {
        borderWidth: 1,
    },
});
