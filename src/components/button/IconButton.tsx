import React from 'react';
import Button, {ButtonProps} from "./Button";

import {iconStandardSize} from '../icon/Icon';

export {IconType} from '../icon/Icon';

export interface IconButtonProps extends Omit<ButtonProps, 'title'|'width'|'height'> {
    size?: number;
}

export const IconButton = React.memo(function IconButton(props: IconButtonProps) {
    const { size = iconStandardSize, ...buttonProps } = props;
    return <Button {...buttonProps} width={size} height={size} />;
});
export default IconButton;
