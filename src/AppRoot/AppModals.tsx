import React from "react";
import createModals from "../components/modal/createModals";
import DebugModal from "../components/modal/DebugModal/DebugModal";
import AlertModal from "../components/modal/AlertModal/AlertModal";

export const ModalKeys = Object.freeze({
    Test: 'Test',
    Debug: 'Debug',
    Alert: 'Alert',
});

const modalMap = {
    [ModalKeys.Test]: DebugModal,
    [ModalKeys.Debug]: DebugModal,
    [ModalKeys.Alert]: AlertModal,
};
export const Modals = createModals(modalMap);
export default Modals;
