import React from "react";
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

export type ColumnProps = React.PropsWithChildren<{
    /** Vertically center contents */
    center?: boolean;
    /** Space out the contents */
    space?: boolean;
    /** Contents can overflow */
    overflow?: boolean;
    /** Can be vertically scrolled */
    scroll?: boolean;
    /** Set style flex:1 */
    flex?: boolean;
    /** Reverse the order */
    reverse?: boolean;
    /** Align to the bottom */
    bottom?: boolean;
    /** Outer style */
    style?: StyleProp<ViewStyle>;
    /** Inner style */
    innerStyle?: StyleProp<ViewStyle>;
}>;

/**
 * A column that can be vertically centered and/or scrolled.
 */
export const Column = React.memo<ColumnProps>(function Column(props: ColumnProps) {
    const {
        style,
        innerStyle,
        center=false,
        space=false,
        overflow=false,
        scroll=false,
        flex=false,
        bottom=false,
        reverse=false,
    } = props;

    const parentStyles: StyleProp<ViewStyle> = [styles.parent];
    if (flex) parentStyles.push(styles.flex);
    if (overflow) parentStyles.push(styles.overflow);

    const childStyles: StyleProp<ViewStyle> = [styles.child];
    if (center) childStyles.push(space ? styles.centerSpaced : styles.center);
    else if (space) childStyles.push(styles.spaced);

    if (bottom) childStyles.push(styles.bottom);
    if (reverse) childStyles.push(styles.reverse);
    if (innerStyle) Array.isArray(innerStyle) ? childStyles.push(...innerStyle) : childStyles.push(innerStyle);

    if (scroll) {
        parentStyles.push(styles.scrollContent);
        return <ScrollView style={style} contentContainerStyle={parentStyles} nestedScrollEnabled>
            <View style={childStyles}>
                {props.children}
            </View>
        </ScrollView>;
    }

    if (style) Array.isArray(style) ? parentStyles.push(...style) : parentStyles.push(style);
    return <View style={parentStyles}>
        <View style={childStyles}>
            {props.children}
        </View>
    </View>;
});
export default Column;

const styles = StyleSheet.create({
    parent: { overflow: "hidden" },
    child: { flex: 1 },
    scrollContent: { flexGrow: 1, overflow: "visible" },

    center: { justifyContent: "center" },
    centerSpaced: { justifyContent: "space-around" },
    spaced: { justifyContent: "space-between" },
    bottom: { justifyContent: "flex-end" },

    overflow: { overflow: "visible" },
    reverse: { flexDirection: "column-reverse" },
    flex: { flex: 1 },
});
