import React from 'react';
import {StyleSheet, TextStyle, View} from "react-native";
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {ButtonProps, buttonPropsWithDefaults, StandardButtonWrapper} from './Button.common';
import {Color, getUIColorTheme} from "../../styles/UIColorTheme";
import Icon, {IconStyles} from "../icon/Icon";
import Row from "../layout/Row";

export * from './Button.common';

export const Button = React.memo<ButtonProps>(function Button(props: ButtonProps) {
    const allProps = buttonPropsWithDefaults(props);
    const {onClick, disabled, title, icon, iconPosition, square} = allProps;

    return <StandardButtonWrapper buttonProps={allProps}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={[styles.background, getBackgroundStyle(allProps)]}
            rounded={!square}
        >
            {/* Icon left of text */ icon && title && iconPosition === "left" ? <View style={styles.iconLeft}>
                <Icon type={icon} style={getIconStyle(allProps)} />
            </View> : null}

            {title ? <NativeBaseText style={getTextStyle(allProps)} uppercase={false}>{title}</NativeBaseText> : null}

            {/* Icon right of text */ icon && title && iconPosition === "right" ? <View style={styles.iconRight}>
                <Icon type={icon} style={getIconStyle(allProps)} />
            </View> : null}

            {/* Icon centered without text */ icon && !title ? <Row center flex style={styles.iconCenter}>
                <Icon type={icon} style={getIconStyle(allProps)} />
            </Row> : null}

        </NativeBaseButton>
    </StandardButtonWrapper>;
});
export default Button;

//<editor-fold desc="Styles">

function getBackgroundStyle(
    {color, invertColor, /*flat, */disabled}: Required<ButtonProps>
): RnViewStyleProp {
    const theme = getUIColorTheme(color, invertColor);
    return {
        backgroundColor: disabled ? theme.primary.disabled : theme.primary.base,

        // TODO handle shadow/flat
        shadowColor: Color.Black,
        // shadowOpacity: 100,
    };
}

function getTextStyle(
    {color, invertColor}: Required<ButtonProps>
): TextStyle {
    const theme = getUIColorTheme(color, invertColor);
    return { color: theme.secondary.base };
}

function getIconStyle(
    {color, invertColor}: Required<ButtonProps>
): IconStyles {
    const theme = getUIColorTheme(color, invertColor);
    return { color: theme.secondary.base };
}

const styles = StyleSheet.create({
    background: {
        flexGrow: 1,
        shadowOffset: { height: 3, width: 3 },
    },
    iconLeft:  { paddingLeft: 12 },
    iconRight: { paddingRight: 12 },
    iconCenter: { paddingHorizontal: 12 }
});

//</editor-fold>
