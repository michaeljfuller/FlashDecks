import React from "react";
import {Text, View, ScrollView} from "react-native";
import CardSide from "./CardSide/CardSide";
import {CardViewBase} from "./CardView.common";
import CardSideActions from "./CardSide/CardSideActions";
import PromptModal from "../modal/PromptModal/PromptModal";
import {styles, headerHeight, borderWidth, footerHeight} from "./CardView.native_styles";
import {CardInfo, CardInfoModal} from "./CardInfo/CardInfoModal";
import {CardModel} from "../../models";
import CardFooter from "./CardFooter/CardFooter";
import IconButton, {IconType} from "../button/IconButton";

export default class CardView extends CardViewBase {

    onClickEdit = () => this.startEditing();
    onClickCancel = () => this.stopEditing();
    onClickDone = () => {
        this.updateCard();
        this.stopEditing();
    }
    onEditCard = (info: CardInfo) => {
        console.log('CardView.onEditCard', info);
        this.updateCard(this.card.update(info));
    }

    onCreateCard = (info: CardInfo) => this.updateCard(CardModel.create(info));
    onAddSideBefore = () => this.addSideBefore();
    onAddSideAfter = () => this.addSideAfter();
    onAddSideToEnd = () => this.addSideToEnd();

    render() {
        const totalHeight = this.state.viewLayout.height;
        const bodyHeight = Math.max(0, totalHeight - (headerHeight + footerHeight + borderWidth * 2));

        return <View style={[styles.root, this.props.style]} onLayout={this.onLayout}>

            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>{this.card?.nameOrPlaceholder()}</Text>
                    {this.props.editable ? this.renderHeaderEdit() : null}
                </View>
                {this.hasActions ? this.renderHeaderActions() : null}
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.body, { minHeight: bodyHeight || undefined }]}
                persistentScrollbar={true}
            >
                { this.renderCardSide(bodyHeight, this.state.editing, true) }
            </ScrollView>

            <CardFooter
                sideNumber={this.state.sideIndex+1}
                totalSides={this.sides.length}
                style={styles.footer}
                textStyle={styles.footerText}
                onAddSide={this.props.editable ? this.onAddSideToEnd : undefined}
                onRemoveSide={this.props.editable ? this.showDeleteSidePrompt : undefined}
            />

            <CardInfoModal
                editable={this.props.editable}
                open={this.state.showCreateCardModal}
                onChange={this.onCreateCard}
                onClose={this.hideCreateCardModal}
            />

        </View>;
    }

    renderHeaderEdit() {
        return <React.Fragment>
            <IconButton
                icon={IconType.Edit}
                onClick={this.showEditCardModal}
                style={styles.renameButton}
                color="Black"
            />
            <CardInfoModal
                editable
                card={this.card}
                open={this.state.showEditCardModal}
                onClose={this.hideEditCardModal}
                onChange={this.onEditCard}
            />
        </React.Fragment>;
    }

    renderHeaderActions() {
        return <View style={styles.headerActions}>
            <CardSideActions
                editing={this.state.editing || false}
                onPressDone={this.state.modifiedCard ? this.onClickDone : undefined}
                onPressCancel={this.onClickCancel}
                onPressEdit={this.onClickEdit}
                onPressAddBefore={this.onAddSideBefore}
                onPressAddAfter={this.addSideAfter}
                onPressDelete={this.showDeleteSidePrompt}
            />
            <PromptModal
                open={this.state.showDeleteSidePrompt}
                onClose={this.hideDeleteSidePrompt}
                onOk={this.onDeleteSide}
                title="Are you sure you want to delete this side?"
            >
                { this.renderCardSide() }
            </PromptModal>
        </View>;
    }

    renderCardSide(height = 0, editing = false, canPress = false) {
        return <CardSide
            side={this.currentSide}
            onPress={canPress ? this.onPress : undefined}
            onModifications={this.onSideChange}
            height={height}
            editing={editing}
            editable={this.props.editable}
            style={{ minHeight: height || undefined }}
        />;
    }
}
