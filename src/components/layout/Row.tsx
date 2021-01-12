import React from "react";
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

export type RowProps = React.PropsWithChildren<{
    /** Horizontally center contents */
    center?: boolean;
    /** Space out the contents */
    space?: boolean;
    /** Contents can overflow */
    overflow?: boolean;
    /** Can wrap contents to the next line */
    wrap?: boolean;
    /** Can be vertically scrolled */
    scroll?: boolean;
    /** Set style flex:1 */
    flex?: boolean;
    /** Outer style */
    style?: StyleProp<ViewStyle>;
    /** Inner style if scroll=true */
    innerStyle?: StyleProp<ViewStyle>;
}>;

/**
 * A row that can be horizontally centered and/or scrolled.
 */
export const Row = React.memo<RowProps>(function Row(props: RowProps) {
    const {
        style,
        innerStyle,
        wrap=false,
        center=false,
        space=false,
        overflow=false,
        scroll=false,
        flex=false,
    } = props;

    const viewStyles: StyleProp<ViewStyle> = [styles.base];
    if (wrap) viewStyles.push(styles.wrap);
    if (overflow) viewStyles.push(styles.overflow);
    if (flex) viewStyles.push(styles.flex);

    if (center) viewStyles.push(space ? styles.centerSpaced : styles.center);
    else if (space) viewStyles.push(styles.spaced);

    if (scroll) {
        viewStyles.push(styles.scrollContent);
        if (innerStyle) Array.isArray(innerStyle) ? viewStyles.push(...innerStyle) : viewStyles.push(innerStyle);
        return <ScrollView horizontal style={[style]} contentContainerStyle={viewStyles}>
            {props.children}
        </ScrollView>;
    }

    if (style) Array.isArray(style) ? viewStyles.push(...style) : viewStyles.push(style);

    return <View style={viewStyles}>
        {props.children}
    </View>;
});
export default Row;

const styles = StyleSheet.create({
    base: { flexDirection: "row" },
    scrollContent: {
        overflow: "visible",
        paddingVertical: 4 ,
    },
    center: { justifyContent: "center" },
    centerSpaced: { justifyContent: "space-around" },
    spaced: { justifyContent: "space-between" },
    wrap: { flexWrap: "wrap" },
    overflow: { overflow: "visible" },
    flex: { flex: 1 },
});
