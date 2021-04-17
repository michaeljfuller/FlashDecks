import {StyleSheet} from "react-native";

const shadowRadius = 4;
export const styles = StyleSheet.create({
    root: {
        // Size
        maxHeight: '100vh',
        maxWidth: '100vw',
        minWidth: '30vw',
        minHeight: '30vh',

        // Border
        borderRadius: 8,
        overflow: "hidden",

        // Shadow
        shadowRadius,
        shadowOpacity: 0.3,
        elevation: shadowRadius * 2,
        shadowOffset: { width: 0, height: shadowRadius }
    },
});
export default styles;
