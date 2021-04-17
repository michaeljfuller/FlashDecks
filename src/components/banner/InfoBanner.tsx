import React from "react";
import {StyleSheet, Text, View} from "react-native";

import {platformOS} from "../../platform";
import {branchName} from "../../env";
import * as appDetails from "../../appDetails";
import {capitalise} from "../../utils/string";

export const InfoBanner = React.memo(function InfoBanner() {
    const frontEnd = `${capitalise(platformOS)} v${appDetails.version}`;
    const backEnd = branchName || 'Unknown';

    return <View style={styles.root}>
        <Text style={[styles.text, styles.left]}>{frontEnd}</Text>
        <Text style={[styles.text, styles.right]}>{backEnd}</Text>
    </View>;
});
export default InfoBanner;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        padding: 4,
        flexGrow: 0,
        flexShrink: 1,
    },
    text: {
        color: 'white',
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
