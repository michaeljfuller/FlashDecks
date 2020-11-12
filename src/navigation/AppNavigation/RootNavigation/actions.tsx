import React from "react";
import {appNavigationRef} from "../appNavigationRef";
import {MODALS_ROUTE, SCREENS_ROUTE} from "./routes";

export interface ModalsScreenProps {}

/** Navigate to the modal screen */
export function navigateToModal(props?: ModalsScreenProps) {
    appNavigationRef.current?.navigate(MODALS_ROUTE, props);
}

/** Navigate back to the "screens" screen. */
export function navigateFromModal() {
    appNavigationRef.current?.navigate(SCREENS_ROUTE);
}

// export function onNavigateToModal(callback: () => void) {
//     const nav = appNavigationRef.current;
//     const wrapper = () => {
//         if (nav?.getCurrentRoute()?.name === MODALS_ROUTE) callback();
//     };
//     nav?.addListener('focus' as any, wrapper);
//     return () => nav?.removeListener('focus' as any, wrapper);
// }
//
// export function onNavigateFromModal(callback: () => void) {
//     const nav = appNavigationRef.current;
//     const wrapper = () => {
//         if (nav?.getCurrentRoute()?.name !== MODALS_ROUTE) callback();
//     };
//     nav?.addListener('blur' as any, wrapper);
//     return () => nav?.removeListener('blur' as any, wrapper);
// }
