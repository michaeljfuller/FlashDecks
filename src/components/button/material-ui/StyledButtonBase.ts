import {withStyles} from "@material-ui/core/styles";
import {ExtendButtonBase} from "@material-ui/core/ButtonBase";
import MaterialButton, {ButtonProps} from "@material-ui/core/Button";
import MaterialIconButton from "@material-ui/core/IconButton";

import {UIColorTheme} from "../../../styles/UIColorTheme";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";

/** Get a Button component for a given variation. */
export function getStyledButtonBase(theme: UIColorTheme, square: boolean, flat: boolean, transparent: boolean, hasText: boolean): ExtendButtonBase<any> {
    return styleMaterialContainedButton(theme, square, flat, transparent, hasText);
}

/** Get an Icon Button component for a given variation. */
export function getStyledIconButtonBase(theme: UIColorTheme, transparent = false, flat = false, hasText = false): ExtendButtonBase<any> {
    if (transparent) {
        return hasText ? styleMaterialTextButton(theme) : StandardIconButton;
    }
    return hasText ? styleMaterialContainedButton(theme, false, flat, transparent, hasText) : styleMaterialContainedRoundButton(theme, flat);
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
function styleMaterialContainedButton(
    theme: UIColorTheme, square: boolean, flat = false, transparent = false, hasText=true
): typeof MaterialButton {
    const key = [
        theme.ref,
        square ? 'square' : 'round',
        flat ? 'flat' : 'raised',
        transparent ? 'transparent' : 'opaque',
        hasText ? 'text' : 'no-text',
    ].join('/');

    const textColor = transparent ? theme.primary : theme.secondary;
    const backgroundColor = transparent ? null : theme.primary;
    const boxShadow = flat || transparent ? 'none' : undefined;

    if (!containedButtonCache[key]) {
        const styled = withStyles({
            root: {
                justifyContent: 'flex-start',
                backgroundColor: backgroundColor?.base || "unset",
                height: '100%',
                width: '100%',
                borderRadius: square ? 0 : 1000,
                color: textColor.base,
                minWidth: 0,
                paddingLeft: hasText ? undefined : 6,
                paddingRight: hasText ? undefined : 6,
                '&:hover': {
                    backgroundColor: backgroundColor?.hover || "unset",
                    color: textColor.hover,
                },
                '&:disabled': {
                    backgroundColor: backgroundColor?.disabled || "unset",
                    color: textColor.disabled,
                }
            },
            label: {
                textTransform: 'none',
                justifyContent: 'center',
                textShadow: transparent && !flat ? '1px 1px 2px rgba(0,0,0,0.5)' : undefined,
            },
            contained: {
                boxShadow,
                '&:hover': { boxShadow },
                '&:disabled': { boxShadow },
                '&:focus': { boxShadow },
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
