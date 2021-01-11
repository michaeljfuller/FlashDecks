import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button as NativeBaseButton, RnViewStyleProp, Text as NativeBaseText} from 'native-base';

import {Icon, IconStyles} from '../icon/Icon';
import {IconButtonProps, iconButtonPropsWithDefaults, IconButtonWrapper} from './IconButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";

export * from './IconButton.common';

export const IconButton = React.memo(function IconButton(props: IconButtonProps) {
    const allProps = iconButtonPropsWithDefaults(props);
    const {onClick, text, disabled, icon, transparent} = allProps;
    const {width, height} = getButtonSize(allProps);

    return <IconButtonWrapper buttonProps={{...allProps, width, height}}>
        <NativeBaseButton
            onPress={onClick}
            disabled={disabled}
            style={getButtonStyle(allProps)}
            transparent={transparent}
        >
            <View style={text ? styles.iconPadLeft : null}><Icon type={icon} style={getIconStyle(allProps)} /></View>
            {text ? <NativeBaseText style={getTextStyle(allProps)}>{text}</NativeBaseText> : undefined}
        </NativeBaseButton>
    </IconButtonWrapper>;
});
export default IconButton;

//<editor-fold desc="Styles">

function getButtonSize(
    {width, height, text}: Required<IconButtonProps>,
    defaultSize=24
): { width?: number; height?: number } {
    return {
        width:  text ? (width || height || undefined) : (width || height || defaultSize),
        height: text ? (height || width || undefined) : (height || width || defaultSize),
    };
}

function getButtonStyle(props: Required<IconButtonProps>): RnViewStyleProp {
    const {color, invertColor, margin, transparent, flat, text} = props;
    const {width, height} = getButtonSize(props);
    const theme = getUIColorTheme(color, invertColor);

    return {
        width, height,
        margin: numberOrDefault(margin, undefined),
        backgroundColor: transparent ? undefined : theme.primary.base,
        borderRadius: text ? 1000 : Math.min(width||0, height||0),
        justifyContent: 'center',
        shadowOpacity: flat ? 0 : undefined,
    };
}

function getIconStyle(
    {color, invertColor, transparent, disabled}: Required<IconButtonProps>
): IconStyles {
    const theme = getUIColorTheme(color, invertColor);
    if (transparent) {
        return { color: disabled ? theme.primary.disabled : theme.primary.base };
    } else {
        return { color: disabled ? theme.secondary.disabled : theme.secondary.base };
    }
}

function getTextStyle(
    {color, invertColor, transparent, disabled}: Required<IconButtonProps>
): IconStyles {
    const theme = getUIColorTheme(color, invertColor);
    if (transparent) {
        return { color: disabled ? theme.primary.disabled : theme.primary.base };
    } else {
        return { color: disabled ? theme.secondary.disabled : theme.secondary.base };
    }
}

const styles = StyleSheet.create({
    iconPadLeft: {
        paddingLeft: 12,
    }
})

//</editor-fold>
