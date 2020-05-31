import {withStyles} from "@material-ui/core/styles";
import {ExtendButtonBase} from "@material-ui/core/ButtonBase";
import MaterialButton, {ButtonProps} from "@material-ui/core/Button";
import MaterialIconButton from "@material-ui/core/IconButton";

import {getUIColorTheme, ColorKey} from "../../../styles/UIColorTheme";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";

/** Get a Button component for a given variation. */
export function getStyledButtonBase(color: ColorKey): ExtendButtonBase<any> {
    return styleMaterialContainedButton(color);
}

/** Get an Icon Button component for a given variation. */
export function getStyledIconButtonBase(color: ColorKey, transparent = false, hasText = false): ExtendButtonBase<any> {
    if (transparent) {
        return hasText ? styleMaterialTextButton(color) : StandardIconButton;
    }
    return hasText ? styleMaterialContainedButton(color) : styleMaterialContainedRoundButton(color);
}

/** Get a Text Button component for a given variation. */
export function getStyledTextButtonBase(color: ColorKey): ExtendButtonBase<any> {
    return styleMaterialTextButton(color);
}

//<editor-fold desc="MaterialIconButton Variations">

/** A styled MaterialIconButton */
const StandardIconButton = withStyles({
    root: {
        // justifyContent: 'flex-start', // left: 'flex-start', right: 'flex-end', center: 'center'
        padding: 0,
        '&:disabled': { opacity: 0.5 }
    },
    label: { textTransform: 'none' }
})(MaterialIconButton) as typeof MaterialIconButton;

//</editor-fold>
//<editor-fold desc="Contained Button Variations">

/** Create a styled Button based on a color theme. */
function styleMaterialContainedButton(color: ColorKey): typeof MaterialButton {
    if (!containedButtonCache[color]) {
        const theme = getUIColorTheme(color);
        const styled = withStyles({
            root: {
                justifyContent: 'flex-start',
                backgroundColor: theme.primary.base,
                color: theme.secondary.base,
                minWidth: 0,
                '&:hover': {
                    backgroundColor: theme.primary.hover,
                    color: theme.secondary.hover,
                },
                '&:disabled': {
                    backgroundColor: theme.primary.disabled,
                    color: theme.secondary.disabled,
                }
            },
            label: {textTransform: 'none'}
        })(MaterialButton) as typeof MaterialButton;
        containedButtonCache[color] = withDefaultProps(styled, { variant: "contained" } as ButtonProps);
    }
    return containedButtonCache[color];
}
const containedButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
//<editor-fold desc="Contained Icon Button Variations">

/** Create a styled Button based on a color theme. */
function styleMaterialContainedRoundButton(color: ColorKey): typeof MaterialButton {
    if (!containedRoundButtonCache[color]) {
        const theme = getUIColorTheme(color);
        const styled = withStyles({
            root: {
                justifyContent: 'flex-start',
                backgroundColor: theme.primary.base,
                color: theme.secondary.base,
                borderRadius: '100%',
                padding: 0,
                minWidth: 0,
                '&:hover': {
                    backgroundColor: theme.primary.hover,
                    color: theme.secondary.hover,
                },
                '&:disabled': {
                    backgroundColor: theme.primary.disabled,
                    color: theme.secondary.disabled,
                }
            },
            label: {textTransform: 'none'}
        })(MaterialButton) as typeof MaterialButton;
        containedRoundButtonCache[color] = withDefaultProps(styled, { variant: "contained" } as ButtonProps);
    }
    return containedRoundButtonCache[color];
}
const containedRoundButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
//<editor-fold desc="Text Button Variations">

/** Create a styled Text Button based on a color theme. */
function styleMaterialTextButton(color: ColorKey) {
    if (!textButtonCache[color]) {
        const theme = getUIColorTheme(color);
        const styled = withStyles({
            root: {
                color: theme.primary.base,
                justifyContent: 'flex-start',
                borderRadius: 0,
                minWidth: 0,
                '&:hover': { color: theme.primary.hover },
                '&:disabled': { color: theme.primary.disabled }
            },
            label: {
                textTransform: 'none'
            }
        })(MaterialButton) as typeof MaterialButton;
        textButtonCache[color] = withDefaultProps(styled, { variant: "text" } as ButtonProps);
    }
    return textButtonCache[color];
}
const textButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
