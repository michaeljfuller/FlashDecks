import {Text, TextProps} from 'react-native';
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";
import {UIColorTheme, UIColorThemeStates} from "../../../styles/UIColorTheme";

/**
 * Get a Text component for a given variation.
 */
export function getStyledButtonText(theme: UIColorTheme, transparent: boolean): typeof Text {
    if (transparent) {
        return styleText(theme.primary);
    } else {
        return styleText(theme.secondary);
    }
}

function styleText(themeStates: UIColorThemeStates): typeof Text {
    const cacheKey = JSON.stringify(themeStates);
    if (!cache[cacheKey]) {
        cache[cacheKey] = withDefaultProps(
            Text, {
                style: {
                    color: themeStates.base
                }
            } as TextProps
        ) as any;
    }
    return cache[cacheKey];
}
const cache = {} as Record<string, typeof Text>;
