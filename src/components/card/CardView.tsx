import React from "react";
import {ScrollView, View} from "react-native";

import globalStyles from "../../styles/globalStyleSheet";
import CardSide from "./CardSide/CardSide";
import CardViewBase from "./CardView.common";
import CardSideActions from "./CardSide/CardSideActions";
import PromptModal from "../modal/PromptModal/PromptModal";
import {
    borderWidth,
    footerHeight,
    headerHeight,
    marginBottom,
    StyledCard,
    StyledCardHeader,
    styles
} from "./CardView_styles";
import {CardInfo, CardInfoModal} from "./CardInfo/CardInfoModal";
import IconButton, {IconType} from "../button/IconButton";
import {CardModel} from "../../models";
import CardFooter from "./CardFooter/CardFooter";

export default class CardView extends CardViewBase {

    onClickEditSide = () => this.startEditing();
    onClickCancelEditSide = () => this.stopEditing();
    onClickDoneEditSide = () => {
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
        const bodyHeight = Math.max(0, totalHeight - (headerHeight + footerHeight + marginBottom + borderWidth * 2));

        return <View style={[this.props.style, styles.root]} onLayout={this.onLayout}>
            <StyledCard variant="elevation" raised={true} elevation={5}>

                <View style={styles.inner}>

                    <View style={styles.headerRow}>
                        <View>
                            <StyledCardHeader title={this.card?.nameOrPlaceholder()}/>
                            {this.props.editable ? this.renderHeaderEdit() : null}
                        </View>
                        {this.hasActions ? this.renderHeaderActions() : null}
                    </View>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.body}>
                        { this.renderCardSide(bodyHeight, this.props.editable, this.state.editing, this.canPress) }
                    </ScrollView>

                </View>

                <CardFooter
                    sideNumber={this.state.sideIndex+1}
                    totalSides={this.sides.length}
                    style={styles.footer}
                    textStyle={styles.footerText}
                    onAddSide={this.props.editable ? this.onAddSideToEnd : undefined}
                    onRemoveSide={this.props.editable ? this.showDeleteSidePrompt : undefined}
                />

            </StyledCard>
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
                onPressDone={this.state.modifiedCard ? this.onClickDoneEditSide : undefined}
                onPressCancel={this.onClickCancelEditSide}
                onPressEdit={this.onClickEditSide}
                onPressAddBefore={this.onAddSideBefore}
                onPressAddAfter={this.onAddSideAfter}
                onPressDelete={this.showDeleteSidePrompt}
            />
            <CardInfoModal
                editable={this.props.editable}
                open={this.state.showCreateCardModal}
                onChange={this.onCreateCard}
                onClose={this.hideCreateCardModal}
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

    renderCardSide(height = 0, editable = false, editing = false, canPress = false) {
        return <CardSide
            side={this.currentSide}
            onPress={canPress ? this.onPress : undefined}
            onModifications={this.onSideChange}
            height={height}
            editing={editing}
            editable={editable}
            style={[styles.side, canPress ? globalStyles.pointer : null]}
        />;
    }
}
