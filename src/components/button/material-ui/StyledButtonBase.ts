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
export function getStyledIconButtonBase(theme: UIColorTheme, transparent = false, flat = false, hasText = false): ExtendButtonBase<any> {
    if (transparent) {
        return hasText ? styleMaterialTextButton(theme) : StandardIconButton;
    }
    return hasText ? styleMaterialContainedButton(theme, flat) : styleMaterialContainedRoundButton(theme, flat);
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
function styleMaterialContainedButton(theme: UIColorTheme, flat = false): typeof MaterialButton {
    const key = `${theme.ref}/${flat?'flat':'raised'}`;
    if (!containedButtonCache[key]) {
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
            label: {textTransform: 'none'},
            contained: {
                boxShadow: flat ? 'none' : undefined,
            }
        })(MaterialButton) as typeof MaterialButton;
        containedButtonCache[key] = withDefaultProps(styled, { variant: "contained" } as ButtonProps);
    }
    return containedButtonCache[key];
}
const containedButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
//<editor-fold desc="Contained Icon Button Variations">

/** Create a styled Button based on a color theme. */
function styleMaterialContainedRoundButton(theme: UIColorTheme, flat = false): typeof MaterialButton {
    const key = `${theme.ref}/${flat?'flat':'raised'}`;
    if (!containedRoundButtonCache[key]) {
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
            label: {textTransform: 'none'},
            contained: {
                boxShadow: flat ? 'none' : undefined,
                '&:hover': {
                    boxShadow: flat ? 'none' : undefined,
                },
            }
        })(MaterialButton) as typeof MaterialButton;
        containedRoundButtonCache[key] = withDefaultProps(styled, { variant: "contained" } as ButtonProps);
    }
    return containedRoundButtonCache[key];
}
const containedRoundButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
//<editor-fold desc="Text Button Variations">

/** Create a styled Text Button based on a color theme. */
function styleMaterialTextButton(theme: UIColorTheme) {
    if (!textButtonCache[theme.ref]) {
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
        textButtonCache[theme.ref] = withDefaultProps(styled, { variant: "text" } as ButtonProps);
    }
    return textButtonCache[theme.ref];
}
const textButtonCache = {} as Record<string, ExtendButtonBase<any>>;

//</editor-fold>
