import React from 'react';
import {getStyledIconButtonBase} from './material-ui/StyledButtonBase';
import {getStyledButtonText} from './material-ui/StyledButtonText';
import {getStyledButtonIcon} from './material-ui/StyledButtonIcon';

import ButtonWrapper from "./core/ButtonWrapper";
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
export * from './IconButton.common';

export function IconButton(props: IconButtonProps) {
    const { onClick, disabled, icon, style, text, transparent, flat, color, invertColor } = iconButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    const defaultIconSize = text ? undefined : 24;

    const ContainerButton = getStyledIconButtonBase(theme, transparent, flat, !!text);
    const IconComponent = getStyledButtonIcon(theme, transparent);
    const TextComponent = getStyledButtonText(theme, transparent);

    return <ButtonWrapper>
        <ContainerButton
            onClick={onClick}
            disabled={disabled}
            style={{
                width: style.width || defaultIconSize,
                height: style.height || defaultIconSize,
                textAlign: "center"
            }}
        >
            <IconComponent type={icon} />
            {text && <TextComponent>{text}</TextComponent>}
        </ContainerButton>
    </ButtonWrapper>;
}
export default IconButton;
