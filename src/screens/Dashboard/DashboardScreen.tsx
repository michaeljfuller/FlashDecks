import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import Icon, {IconType} from "../../components/icon/Icon";

export default class DashboardScreen extends PureComponent<NavigationScreenProps>
{
    render() {
        return (
            <ScreenContainer style={styles.root}>

                <Text style={styles.title}>Welcome to FlashDecks</Text>
                <View style={styles.box}>

                    <View style={styles.paragraph}>
                        <Text>This is a purely technical exercise, so there's room for the UX to be improved.</Text>
                        <View style={styles.row}>
                            <Text>In lieu of a better UX design, you can use the</Text>
                            <Icon type={IconType.QuestionMark} style={{height: 20}} />
                            <Text>buttons for guidance.</Text>
                        </View>
                    </View>

                    <View style={styles.paragraph}>
                        <View style={styles.row}>
                            <Text>To begin, open the sidebar with the</Text>
                            <Icon type={IconType.Menu} style={{height: 20}} />
                            <Text>button in the banner.</Text>
                        </View>
                    </View>

                </View>

            </ScreenContainer>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        padding: 5,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 26,
    },
    heading: {
        fontWeight: "bold",
    },
    box: {
        padding: 4,
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    paragraph: {
        marginVertical: 4,
    },
    row: {
        flexDirection: "row",
    },
});
