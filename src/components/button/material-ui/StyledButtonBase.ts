import {withStyles} from "@material-ui/core/styles";
import {ExtendButtonBase} from "@material-ui/core/ButtonBase";
import MaterialButton, {ButtonProps} from "@material-ui/core/Button";
import MaterialIconButton from "@material-ui/core/IconButton";

import {UIColorTheme} from "../../../styles/UIColorTheme";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";

/** Get a Button component for a given variation. */
export function getStyledButtonBase(theme: UIColorTheme): ExtendButtonBase<any> {
    return styleMaterialContainedButton(theme);
}

/** Get an Icon Button component for a given variation. */
export function getStyledIconButtonBase(theme: UIColorTheme, transparent = false, hasText = false): ExtendButtonBase<any> {
    if (transparent) {
        return hasText ? styleMaterialTextButton(theme) : StandardIconButton;
    }
    return hasText ? styleMaterialContainedButton(theme) : styleMaterialContainedRoundButton(theme);
}

/** Get a Text Button component for a given variation. */
export function getStyledTextButtonBase(theme: UIColorTheme): ExtendButtonBase<any> {
    return styleMaterialTextButton(theme);
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
function styleMaterialContainedButton(theme: UIColorTheme): typeof MaterialButton {
    if (!containedButtonCache[theme.name]) {
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
        containedButtonCache[theme.name] = withDefaultProps(styled, { variant: "contained" } as ButtonProps);
    }
    return containedButtonCache[theme.name];
}
const containedButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
//<editor-fold desc="Contained Icon Button Variations">

/** Create a styled Button based on a color theme. */
function styleMaterialContainedRoundButton(theme: UIColorTheme): typeof MaterialButton {
    if (!containedRoundButtonCache[theme.name]) {
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
        containedRoundButtonCache[theme.name] = withDefaultProps(styled, { variant: "contained" } as ButtonProps);
    }
    return containedRoundButtonCache[theme.name];
}
const containedRoundButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
//<editor-fold desc="Text Button Variations">

/** Create a styled Text Button based on a color theme. */
function styleMaterialTextButton(theme: UIColorTheme) {
    if (!textButtonCache[theme.name]) {
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
        textButtonCache[theme.name] = withDefaultProps(styled, { variant: "text" } as ButtonProps);
    }
    return textButtonCache[theme.name];
}
const textButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
