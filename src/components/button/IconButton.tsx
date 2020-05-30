import React from 'react';
import {getStyledIconButtonBase} from './material-ui/StyledButtonBase';
import {getStyledButtonText} from './material-ui/StyledButtonText';
import {getStyledButtonIcon} from './material-ui/StyledButtonIcon';

import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, disabled, icon, style, text, transparent, color } = iconButtonPropsWithDefaults(props);

    const ContainerButton = getStyledIconButtonBase(color, transparent, !!text);
    const IconComponent = getStyledButtonIcon(color, transparent);
    const TextComponent = getStyledButtonText(color, transparent);

    return <ContainerButton
        onClick={onClick}
        disabled={disabled}
        style={{ width: style.width, height: style.height, textAlign: "center" }}
    >
        <IconComponent type={icon} />
        {text && <TextComponent>{text}</TextComponent>}
    </ContainerButton>;
}
export default IconButton;
