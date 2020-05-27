import React from "react";
import {StyleSheet, Text, View} from "react-native";

import {deviceName, platformOS, isPlatformWeb} from "../../platform";
import {envName, isProduction} from "../../env";
import * as appDetails from "../../appDetails";

export default function InfoBanner() {
    if (isProduction) return null;

    const leftText = `${appDetails.appName} - ${appDetails.description}`;
    const rightText = `${deviceName} (${platformOS}) [${envName}@${appDetails.version}]`;

    return <View  style={{ display: 'flex', flexDirection: 'row' }}>
        {isPlatformWeb && <Text style={styles.text}>{leftText}</Text>}
        <Text style={[styles.text, {textAlign: 'right'}]}>{rightText}</Text>
    </View>;

}
const styles = StyleSheet.create({
    text: {
        backgroundColor: 'lightblue',
        color: 'white',
        padding: 2,
        flex: 1
    }
});
