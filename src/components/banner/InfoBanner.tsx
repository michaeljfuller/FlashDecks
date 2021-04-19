import React from "react";
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";

import {platformOS} from "../../platform";
import {backendBranch, frontendBranch, frontendCommit} from "../../env";
import * as appDetails from "../../appDetails";
import {capitalise} from "../../utils/string";

export interface InfoBannerProps {
    style?: StyleProp<ViewStyle>;
}
export const InfoBanner = React.memo(function InfoBanner(props: InfoBannerProps) {
    return <View style={[styles.root, props.style]}>
        <Text style={[styles.text, styles.left]}>{
            [
                capitalise(platformOS),
                appDetails.version ? `v${appDetails.version}` : null,
                frontendCommit ? `[${frontendCommit}]` : ''
            ].filter(v => v).join(' ')
        }</Text>
        {frontendBranch ? <Text style={[styles.text, styles.right]}>{`UI: ${frontendBranch}`}</Text> : null}
        {backendBranch ? <Text style={[styles.text, styles.right]}>{`API: ${backendBranch}`}</Text> : null}
    </View>;
});
export default InfoBanner;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        paddingHorizontal: 4,
        paddingVertical: 1,
        flexGrow: 0,
        flexShrink: 1,
    },
    text: {
        color: 'white',
        fontSize: 10,
    },
    left: {
        flexGrow: 1,
        flexShrink: 0,
    },
    right: {
        borderColor: 'white',
        borderLeftWidth: 1,
        paddingLeft: 5,
        marginLeft: 5,
    },
});
