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
    const cacheKey = JSON.stringify(themeStates);
    if (!cache[cacheKey]) {
        cache[cacheKey] = withDefaultProps(
            Icon, {
                style: {
                    color: themeStates.base
                }
            } as IconProps
        );
    }
    return cache[cacheKey];
}
const cache = {} as Record<string, typeof Icon>;
