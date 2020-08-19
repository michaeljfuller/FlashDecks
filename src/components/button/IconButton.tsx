import React from 'react';
import {getStyledIconButtonBase} from './material-ui/StyledButtonBase';
import {getStyledButtonText} from './material-ui/StyledButtonText';
import {getStyledButtonIcon} from './material-ui/StyledButtonIcon';

import ButtonWrapper from "./core/ButtonWrapper";
import {IconButtonProps, iconButtonPropsWithDefaults} from './IconButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";
export * from './IconButton.common';

export const IconButton = React.memo(function IconButton(props: IconButtonProps) {
    const { onClick, disabled, icon, style, text, transparent, flat, color, invertColor, width, height, margin } = iconButtonPropsWithDefaults(props);
    const theme = getUIColorTheme(color, invertColor);
    const defaultIconSize = text ? undefined : 24;

    const ContainerButton = getStyledIconButtonBase(theme, transparent, flat, !!text);
    const IconComponent = getStyledButtonIcon(theme, transparent);
    const TextComponent = getStyledButtonText(theme, transparent);

    return <ButtonWrapper style={style}>
        <ContainerButton
            onClick={onClick}
            disabled={disabled}
            style={{
                width: numberOrDefault(width, defaultIconSize),
                height: numberOrDefault(height, defaultIconSize),
                margin: numberOrDefault(margin, undefined),
                textAlign: "center"
            }}
        >
            <IconComponent type={icon} />
            {text && <TextComponent>{text}</TextComponent>}
        </ContainerButton>
    </ButtonWrapper>;
});
export default IconButton;
