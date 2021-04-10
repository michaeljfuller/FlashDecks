import React from "react";
import {StyleSheet, Text, View} from "react-native";
import DeckScreenHeaderBase from "./DeckScreenHeader.common";
import Avatar from "../../../components/avatar/Avatar";
import IconButton, {IconType} from "../../../components/button/IconButton";
import Row from "../../../components/layout/Row";
import Button from "../../../components/button/Button";
import Column from "../../../components/layout/Column";
import {Visibility} from "../../../components/layout/Visibility";

const avatarSize = 24;

export default class DeckScreenHeader extends DeckScreenHeaderBase {
    render() {
        const {
            editable,
            saveText,
            onAddCard,
            onRemoveCard,
            onSave,
            onUndo,
            onOpenInfoModal,
            onOpenHelpModal,
            title,
            item
        } = this.props;
        const {
            cardCount,
        } = this;

        return <Column>

            <Row style={styles.padSides}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{title || item.title}</Text>
                </View>
                <IconButton style={styles.infoButton} flat icon={IconType.Info} onClick={onOpenInfoModal} />
                <IconButton style={styles.helpButton} flat icon={IconType.QuestionMark} onClick={onOpenHelpModal} />
            </Row>

            <Row style={[styles.padSides, styles.padBottom]}>
                <Row flex>

                    <Avatar
                        user={item.owner}
                        labelPlacement="right"
                        size={avatarSize}
                        style={styles.avatar}
                        labelStyle={styles.avatarLabel}
                    />

                </Row>
                <Row flex right>

                    {editable ? <IconButton icon={IconType.Add} style={styles.cardCountButton} onClick={onAddCard} /> : undefined}
                    {editable ? <IconButton icon={IconType.Remove} style={styles.cardCountButton} onClick={onRemoveCard} /> : undefined}
                    <Text style={styles.cardCount}>{cardCount} {cardCount !== 1 ? 'cards' : 'card'}</Text>

                </Row>
            </Row>

            <Visibility render={!!saveText}>
                <Row>
                    <Button title={saveText} onClick={onSave} square height={30} style={styles.saveButton} />
                    <Button title="Undo"     onClick={onUndo} square height={30} width={70}/>
                </Row>
            </Visibility>

        </Column>;
    }
}

const styles = StyleSheet.create({
    padSides: { paddingHorizontal: 5, },
    padBottom: { paddingBottom: 5 },
    titleView: {
        flex: 1,
        paddingHorizontal: 25, // icon size
    },
    titleText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 26,
        width: "100%",
    },
    infoButton: {
        position: "absolute",
        right: 30,
        top: 7,
    },
    helpButton: {
        position: "absolute",
        right: 0,
        top: 7,
    },
    avatar: {
        flex: 1,
    },
    avatarLabel: {
        color: "black"
    },
    cardCount: {
        lineHeight: avatarSize,
        textAlign: "right",
    },
    cardCountButton: {
        marginRight: 2,
    },
    saveButton: {
        marginRight: 1,
        flex: 1,
    },
});
