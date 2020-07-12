import {DefaultTheme, GetUIColorThemeInput} from "../../styles/UIColorTheme";

export interface LinkButtonProps {
    title?: string;
    url?: string;
    disabled?: boolean;
    flat?: boolean;
    style?: LinkButtonStyle;
    color?: GetUIColorThemeInput;
    invertColor?: boolean;
    square?: boolean;
}
export interface LinkButtonStyle {
    width?: number;
    height?: number;
}

export function linkButtonPropsWithDefaults(props: LinkButtonProps): Required<LinkButtonProps> {
    const hostname = getHostname(props.url);
    const {
        disabled = false,
        title = hostname.replace(/^www\./, '') || 'Invalid Link',
        flat = false,
        style = {},
        color = DefaultTheme.primary.key,
        invertColor = false,
        square = false,
        url = '',
    } = props;
    return {
        title, flat, style, color, invertColor, square, url,
        disabled: disabled || !hostname,
    };
}

function getHostname(uri?: string): string {
    const [protocol, urn = ''] = (uri||'').split('://');
    const [host, path = ''] = urn.split('/', 2);
    return host;
}
