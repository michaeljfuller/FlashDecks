import React from 'react';

export const modalPortalNetworkId = "_MODALS_";

export interface ModalProps {
    /** If the Modal is open */
    open: boolean;
    /** Callback when the Modal is opened */
    onOpen?: () => void;
    /** Callback when the Modal is closed */
    onClose?: () => void;
}
