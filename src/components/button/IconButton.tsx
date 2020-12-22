import React from 'react';
import {getStyledIconButtonBase} from './material-ui/StyledButtonBase';
import {getStyledButtonText} from './material-ui/StyledButtonText';
import {getStyledButtonIcon} from './material-ui/StyledButtonIcon';

import {IconButtonProps, iconButtonPropsWithDefaults, IconButtonWrapper} from './IconButton.common';
import {getUIColorTheme} from "../../styles/UIColorTheme";
import {numberOrDefault} from "../../utils/math";

export * from './IconButton.common';

export const IconButton = React.memo(function IconButton(props: IconButtonProps) {
    const allProps = iconButtonPropsWithDefaults(props);
    const {onClick, disabled, icon, text, transparent, flat, color, invertColor, width, height, margin} = allProps;
    const theme = getUIColorTheme(color, invertColor);
    const defaultIconSize = text ? undefined : 24;

    const ContainerButton = getStyledIconButtonBase(theme, transparent, flat, !!text);
    const IconComponent = getStyledButtonIcon(theme, transparent);
    const TextComponent = getStyledButtonText(theme, transparent);

    return <IconButtonWrapper buttonProps={{
        ...allProps,
        width: numberOrDefault(width, defaultIconSize),
        height: numberOrDefault(height, defaultIconSize)
    }}>
        <ContainerButton
            onClick={onClick}
            disabled={disabled}
            style={{ margin: numberOrDefault(margin, undefined), textAlign: "center" }}
        >
            <IconComponent type={icon} />
            {text && <TextComponent>{text}</TextComponent>}
        </ContainerButton>
    </IconButtonWrapper>;
});
export default IconButton;
