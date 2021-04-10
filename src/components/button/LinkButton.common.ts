import {buttonPropsWithDefaults, ButtonProps} from "./Button.common";
import {validUrl} from "../../utils/string";

export interface LinkButtonProps extends Omit<ButtonProps, 'onClick'> {
    url?: string;
}

export function linkButtonPropsWithDefaults(props: LinkButtonProps): Required<LinkButtonProps> {
    const hostname = getHostname(props.url).replace(/^www\./, '');
    return {
        ...buttonPropsWithDefaults(props),
        url: props.url || '',
        title: props.title || hostname || 'Invalid Link',
        disabled: props.disabled || !validUrl(props.url),
    };
}

function getHostname(uri?: string): string {
    const urn = (uri||'').split('://', 2).pop() || '';
    return urn.split('/', 2)[0];
}
