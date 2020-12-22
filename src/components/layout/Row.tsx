import React from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

export type RowProps = React.PropsWithChildren<{
    wrap?: boolean;
    center?: boolean;
    space?: boolean;
    style?: ViewStyle|ViewStyle[];
}>;

/** A simple row. */
export const Row = React.memo<RowProps>(function Row(props: RowProps) {
    const {style, wrap, center, space} = props;
    const viewStyles: ViewStyle[] = [styles.base];

    if (wrap) {
        viewStyles.push(styles.wrap);
    }

    if (center) {
        viewStyles.push(space ? styles.centerSpaced : styles.center);
    } else if (space) {
        viewStyles.push(styles.spaced);
    }

    if (style) Array.isArray(style) ? viewStyles.push(...style) : viewStyles.push(style);

    return <View style={viewStyles}>{props.children}</View>;
});
export default Row;

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
    },
    center: { justifyContent: "center" },
    centerSpaced: { justifyContent: "space-around" },
    spaced: { justifyContent: "space-between" },
    wrap: {
        flexWrap: "wrap"
    },
});
