import React from "react";
import {ScrollView, View} from "react-native";

import globalStyles from "../../styles/globalStyleSheet";
import CardSide from "./CardSide/CardSide";
import CardViewBase from "./CardView.common";
import CardSideActions from "./CardSide/CardSideActions";
import PromptModal from "../modal/PromptModal/PromptModal";
import { styles, StyledCard, StyledCardHeader, headerHeight, footerHeight, borderWidth, marginBottom }  from "./CardView_styles";
import {CardInfoModal} from "./CardInfo/CardInfoModal";
import {CardModel} from "../../models";
import CardFooter from "./CardFooter/CardFooter";

export default class CardView extends CardViewBase {

    onCreateCard = (card: CardModel) => this.updateCard(card);
    onAddSide = () => this.addSide();
    onRemoveSide = () => this.removeSide();

    render() {
        const totalHeight = this.state.viewLayout.height;
        const bodyHeight = Math.max(0, totalHeight - (headerHeight + footerHeight + marginBottom + borderWidth * 2));

        return <View style={this.props.style} onLayout={this.onLayout}>
            <StyledCard variant="elevation" raised={true} elevation={5}>

                <View style={styles.inner}>

                    <View>
                        <StyledCardHeader title={this.card?.nameOrPlaceholder()}/>
                        {this.hasActions ? this.renderHeaderActions() : null}
                    </View>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.body}>
                        { this.renderCardSide(bodyHeight, this.state.editing, this.canPress) }
                    </ScrollView>

                </View>

                <CardFooter
                    sideNumber={this.state.sideIndex+1}
                    totalSides={this.sides.length}
                    style={styles.footer}
                    textStyle={styles.footerText}
                    onAddSide={this.props.editable ? this.onAddSide : undefined}
                    onRemoveSide={this.props.editable ? this.onRemoveSide : undefined}
                />

            </StyledCard>
        </View>;
    }

    renderHeaderActions() {
        return <View style={styles.headerActions}>
            <CardSideActions
                editing={this.state.editing || false}
                onPressDone={this.state.modifiedCard ? this.onClickDone : undefined}
                onPressCancel={this.onClickCancel}
                onPressEdit={this.onClickEdit}
                onPressAddBefore={this.onAddBefore}
                onPressAddAfter={this.onAddAfter}
                onPressDelete={this.showDeleteSlidePrompt}
            />
            <CardInfoModal
                editable={this.props.editable}
                open={this.state.showCreateCardModal}
                onChange={this.onCreateCard}
            />
            <PromptModal
                open={this.state.showDeleteSlidePrompt}
                onClose={this.hideDeleteSlidePrompt}
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
            style={[styles.side, canPress ? globalStyles.pointer : null]}
        />;
    }
}
