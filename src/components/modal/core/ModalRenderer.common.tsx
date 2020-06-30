import React from 'react';
import Modal from "./Modal";

export interface ModalRendererProps {
    modal: Modal|null;
    background: React.ReactNode;
    close: () => void;
}
