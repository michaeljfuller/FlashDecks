import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import Icon, {IconType} from "../../components/icon/Icon";
import Heading from "../../components/ui/Heading";
import Paragraph from "../../components/ui/Paragraph";

export default class DashboardScreen extends PureComponent<NavigationScreenProps>
{
    render() {
        return (
            <ScreenContainer style={styles.root}>

                <Heading style={styles.title}>Welcome to FlashDecks</Heading>
                <View style={styles.box}>

                    <Paragraph>
                        <Text>This is a purely technical exercise, so there's room for the UX to be improved.</Text>
                        <View style={styles.row}>
                            <Text style={styles.iconText}>In lieu of a better UX design, you can use the</Text>
                            <Icon style={styles.icon} size={iconSize} type={IconType.QuestionMark} />
                            <Text style={styles.iconText}>buttons for guidance.</Text>
                        </View>
                    </Paragraph>

                    <Paragraph>
                        <View style={styles.row}>
                            <Text style={styles.iconText}>To begin, open the sidebar with the</Text>
                            <Icon style={styles.icon} size={iconSize} type={IconType.Menu} />
                            <Text style={styles.iconText}>button in the banner.</Text>
                        </View>
                    </Paragraph>

                </View>

            </ScreenContainer>
        );
    }
}

const iconSize = 20;
const styles = StyleSheet.create({
    root: {
        padding: 5,
    },
    title: {
        textAlign: "center",
        fontSize: 26,
    },
    box: {
        padding: 4,
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        flexShrink: 1
    },
    icon: {
        marginHorizontal: 2,
    },
    iconText: {
        lineHeight: iconSize,
        flexWrap: "wrap",
    },
});
