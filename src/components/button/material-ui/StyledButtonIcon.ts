import {Icon, IconProps} from "../../icon/Icon";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";
import {UIColorTheme, UIColorThemeStates} from "../../../styles/UIColorTheme";

/**
 * Get an Icon component for a given variation.
 */
export function getStyledButtonIcon(theme: UIColorTheme, transparent: boolean): typeof Icon {
    if (transparent) {
        return styleIcon(theme.primary);
    } else {
        return styleIcon(theme.secondary);
    }
}

function styleIcon(themeStates: UIColorThemeStates): typeof Icon {
    if (!cache[themeStates.key]) {
        cache[themeStates.key] = withDefaultProps(
            Icon, {
                style: {
                    color: themeStates.base,
                    padding: 1,
                }
            } as IconProps
        );
    }
    return cache[themeStates.key];
}
const cache = {} as Record<string, typeof Icon>;
