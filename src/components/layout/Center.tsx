import React, {PropsWithChildren} from "react";
import {StyleSheet, View, ViewProps} from "react-native";

export interface CenterProps extends PropsWithChildren<ViewProps> {
}

/**
 * Center the contents.
 */
export const Center = React.memo(function Center(props: CenterProps) {
    const {style, children, ...viewProps} = props;
    return <View
        style={[
            styles.root,
            style,
        ]}
        {...viewProps}
    >{children}</View>
});
export default Center;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
