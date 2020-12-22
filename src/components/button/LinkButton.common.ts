import {ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";

export interface LinkButtonProps {
    title?: string;
    url?: string;
    disabled?: boolean;
    flat?: boolean;
    style?: ViewStyle|ViewStyle[];
    width?: number;
    height?: number;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    square?: boolean;
    grow?: boolean|number;
    shrink?: boolean|number;
    size?: number;
}

export function linkButtonPropsWithDefaults(props: LinkButtonProps): Required<LinkButtonProps> {
    const hostname = getHostname(props.url);
    const {
        disabled = false,
        title = hostname.replace(/^www\./, '') || 'Invalid Link',
        flat = false,
        style = {},
        width = Number.NaN,
        height = Number.NaN,
        color = DefaultTheme.primary.key,
        invertColor = false,
        square = false,
        grow = false,
        shrink = false,
        size = Number.NaN,
        url = '',
    } = props;
    return {
        title, flat, style, color, invertColor, square, url, width, height, grow, shrink, size,
        disabled: disabled || !hostname,
    };
}

function getHostname(uri?: string): string {
    const urn = (uri||'').split('://', 2)[1] || '';
    return urn.split('/', 2)[0];
}
