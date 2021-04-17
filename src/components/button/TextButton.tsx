import React from 'react';
import Button, {ButtonProps} from "./Button";

export interface TextButtonProps extends Omit<ButtonProps, 'text'|'icon'|'iconPosition'|'transparent'|'square'|'flat'|'invertColor'> {

}

export const TextButton = React.memo(function TextButton(props: TextButtonProps) {
    return <Button{...props} transparent square flat  />;
});
export default TextButton;
