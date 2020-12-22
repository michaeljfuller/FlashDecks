import React from 'react';

import {TextButtonProps, textButtonPropsWithDefaults, TextButtonWrapper} from './TextButton.common';
import {getStyledTextButtonBase} from "./material-ui/StyledButtonBase";
import {getUIColorTheme} from "../../styles/UIColorTheme";

export * from './TextButton.common';

export const TextButton = React.memo(function TextButton(props: TextButtonProps) {
    const allProps = textButtonPropsWithDefaults(props);
    const {onClick, disabled, title, color, invertColor} = allProps;

    const theme = getUIColorTheme(color, invertColor);
    const StyledButton = getStyledTextButtonBase(theme);

    return <TextButtonWrapper buttonProps={allProps}>
        <StyledButton onClick={onClick} disabled={disabled}>{title}</StyledButton>
    </TextButtonWrapper>;
});
export default TextButton;
