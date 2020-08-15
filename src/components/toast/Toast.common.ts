export interface ToastProps {
    /** If the Toast should show. */
    show: boolean;

    /** Callback on the Toast closing, and if the action button was pressed. Defaults to "OK".  */
    onClose: (action: boolean, timeout: boolean) => void;

    /** Toast message */
    text: string;

    /** Text of the action button */
    actionText?: string;

    /** Determines the style. */
    type?: ToastType;

    /** Duration in milliseconds. Default is indefinite. */
    duration?: number;
}

export type ToastType = "default"|"success"|"error"|"warning";
