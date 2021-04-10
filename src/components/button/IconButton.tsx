import React from 'react';
import Button, {ButtonProps} from "./Button";

import {iconStandardSize} from '../icon/Icon';

export {IconType} from '../icon/Icon';

export interface IconButtonProps extends Omit<ButtonProps, 'title'|'iconPosition'> {
    size?: number;
}

export const IconButton = React.memo(function IconButton(props: IconButtonProps) {
    const {
        width = props.size || iconStandardSize,
        height = props.size || iconStandardSize,
        ...buttonProps
    } = props;
    return <Button {...buttonProps} width={width} height={height} />;
});
export default IconButton;
