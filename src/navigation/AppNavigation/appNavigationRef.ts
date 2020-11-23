import React from "react";
import {DrawerActions, NavigationContainerRef} from '@react-navigation/native';

export const appNavigationRef = React.createRef<NavigationContainerRef>();
export default appNavigationRef;

export const toggleDrawer = () => appNavigationRef.current?.dispatch(DrawerActions.toggleDrawer());
export const openDrawer   = () => appNavigationRef.current?.dispatch(DrawerActions.openDrawer());
export const closeDrawer  = () => appNavigationRef.current?.dispatch(DrawerActions.closeDrawer());
export const getRootState = () => appNavigationRef.current?.getRootState();
