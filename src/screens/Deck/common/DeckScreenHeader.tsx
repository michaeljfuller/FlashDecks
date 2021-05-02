import React from "react";
import {StyleSheet, Text} from "react-native";
import DeckScreenHeaderBase from "./DeckScreenHeader.common";
import Avatar from "../../../components/avatar/Avatar";
import IconButton, {IconType} from "../../../components/button/IconButton";
import Row from "../../../components/layout/Row";
import Button from "../../../components/button/Button";
import {Visibility} from "../../../components/layout/Visibility";
import Column from "../../../components/layout/Column";
import {Color, DisabledColor} from "../../../styles/Color";

const avatarSize = 35;

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

        return <Column style={[styles.root, {
            backgroundColor: this.disabled ? DisabledColor.OffWhite : Color.OffWhite,
        }]}>

            <Row center style={styles.titleRow}>
                <Text style={styles.titleText}>{title || item.title}</Text>
                <IconButton style={styles.iconButton} flat icon={IconType.Info} onClick={onOpenInfoModal} disabled={this.disabled} />
                <IconButton style={styles.iconButton} flat icon={IconType.QuestionMark} onClick={onOpenHelpModal} />
            </Row>

            <Row style={styles.actionsRow}>
                <Row flex>

                    <Avatar
                        user={item.owner}
                        labelPlacement="right"
                        size={avatarSize}
                        labelStyle={styles.avatarLabel}
                    />

                </Row>
                <Visibility render={!!saveText}>

                    <Row>
                        <Button title={saveText} disabled={this.disabled} onClick={onSave} square height={avatarSize} width={150} />
                        <Button title="Undo"     disabled={this.disabled} onClick={onUndo} square height={avatarSize} style={styles.undoButton} />
                    </Row>

                </Visibility>
                <Row flex right>

                    {editable ? <IconButton icon={IconType.Add}    style={styles.cardCountButton} size={30} disabled={this.disabled} onClick={onAddCard}    /> : undefined}
                    {editable ? <IconButton icon={IconType.Remove} style={styles.cardCountButton} size={30} disabled={this.disabled} onClick={onRemoveCard} /> : undefined}
                    <Text style={styles.cardCount}>{cardCount} {cardCount !== 1 ? 'cards' : 'card'}</Text>

                </Row>
            </Row>

        </Column>;
    }
}

const styles = StyleSheet.create({
    root: {
        padding: 2,
    },
    titleRow: {
        height: avatarSize
    },
    actionsRow: {
        minHeight: avatarSize
    },
    avatarLabel: {
        color: 'black',
    },
    titleText: {
        lineHeight: avatarSize,
        fontSize: Math.floor(avatarSize*0.7),
        fontWeight: "bold",
    },
    iconButton: {
        marginLeft: 5,
    },
    cardCount: {
        lineHeight: avatarSize,
    },
    cardCountButton: {
        paddingTop: (avatarSize-24)/2,
        paddingRight: 5,
    },
    undoButton: {
        marginLeft: 1,
    },
});
