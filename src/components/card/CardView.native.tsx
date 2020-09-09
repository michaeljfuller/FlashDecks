import React from "react";
import {Text, View, ScrollView} from "react-native";
import CardSide from "./CardSide/CardSide";
import {CardViewBase} from "./CardView.common";
import CardSideActions from "./CardSide/CardSideActions";
import PromptModal from "../modal/PromptModal/PromptModal";
import {styles, headerHeight, borderWidth, footerHeight} from "./CardView.native_styles";

export default class CardView extends CardViewBase {
    render() {
        const totalHeight = this.state.viewLayout.height;
        const bodyHeight = Math.max(0, totalHeight - (headerHeight + footerHeight + borderWidth * 2));
        const footerText = this.sides.length > 1 ? `${this.state.sideIndex+1}/${this.sides.length}` : '';

        return <View style={[styles.root, this.props.style]} onLayout={this.onLayout}>

            <View style={styles.headerRow}>
                <Text style={styles.title}>{this.card?.name || "Unknown"}</Text>
                {this.hasActions ? this.renderHeaderActions() : null}
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.body, { minHeight: bodyHeight || undefined }]}
                persistentScrollbar={true}
            >
                { this.renderCardSide(bodyHeight, this.state.editing, true) }
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{footerText}</Text>
            </View>
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
            style={{ minHeight: height || undefined }}
        />;
    }
}
