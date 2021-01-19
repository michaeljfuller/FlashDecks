import {buttonPropsWithDefaults, ButtonProps} from "./Button.common";

export interface LinkButtonProps extends Omit<ButtonProps, 'onClick'> {
    url?: string;
}

export function linkButtonPropsWithDefaults(props: LinkButtonProps): Required<LinkButtonProps> {
    const hostname = getHostname(props.url);
    return {
        ...buttonPropsWithDefaults(props),
        url: props.url || '',
        title: props.title || hostname.replace(/^www\./, '') || 'Invalid Link',
        disabled: props.disabled || !hostname,
    };
}

function getHostname(uri?: string): string {
    const urn = (uri||'').split('://', 2)[1] || '';
    return urn.split('/', 2)[0];
}
