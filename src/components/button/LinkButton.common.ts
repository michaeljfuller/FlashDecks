import {ViewStyle} from "react-native";
import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";

export interface LinkButtonProps {
    title?: string;
    url?: string;
    disabled?: boolean;
    flat?: boolean;
    style?: ViewStyle;
    width?: number;
    height?: number;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    square?: boolean;
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
        url = '',
    } = props;
    return {
        title, flat, style, color, invertColor, square, url, width, height,
        disabled: disabled || !hostname,
    };
}

function getHostname(uri?: string): string {
    const [protocol, urn = ''] = (uri||'').split('://');
    const [host, path = ''] = urn.split('/', 2);
    return host;
}
