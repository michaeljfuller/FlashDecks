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
    } = props;

    const parentStyles: StyleProp<ViewStyle> = [styles.parent];
    const childStyles: StyleProp<ViewStyle> = [styles.child];

    if (overflow) parentStyles.push(styles.overflow);
    if (innerStyle) Array.isArray(innerStyle) ? childStyles.push(...innerStyle) : childStyles.push(innerStyle);
    if (flex) parentStyles.push(styles.flex);

    if (center) childStyles.push(space ? styles.centerSpaced : styles.center);
    else if (space) childStyles.push(styles.spaced);

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
    overflow: { overflow: "visible" },
    flex: { flex: 1 },
});
