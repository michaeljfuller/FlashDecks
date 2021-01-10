import React from "react";
import {ScrollView, StyleSheet, View, ViewStyle} from "react-native";

export type RowProps = React.PropsWithChildren<{
    wrap?: boolean;
    center?: boolean;
    space?: boolean;
    overflow?: boolean;
    scroll?: boolean;
    style?: ViewStyle|ViewStyle[];
}>;

/** A simple row. */
export const Row = React.memo<RowProps>(function Row(props: RowProps) {
    const {style, wrap, center, space, overflow, scroll} = props;
    const viewStyles: ViewStyle[] = [styles.base];

    if (wrap) viewStyles.push(styles.wrap);
    if (overflow) viewStyles.push(styles.overflow);

    if (center) viewStyles.push(space ? styles.centerSpaced : styles.center);
    else if (space) viewStyles.push(styles.spaced);

    if (scroll) {
        return <ScrollView horizontal style={style} contentContainerStyle={viewStyles}>
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
    base: {
        flexDirection: "row",
        overflow: "hidden",
    },
    center: { justifyContent: "center" },
    centerSpaced: { justifyContent: "space-around" },
    spaced: { justifyContent: "space-between" },
    wrap: { flexWrap: "wrap" },
    overflow: { overflow: "visible" },
});
