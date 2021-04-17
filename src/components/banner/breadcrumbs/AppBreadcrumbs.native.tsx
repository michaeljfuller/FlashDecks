import React from "react";
import {Body, Title} from 'native-base';

import {readableRoute} from "../../../routes";
import {AppBreadcrumbsProps, getCurrentRoutes} from './AppBreadcrumbs.common';
import {reduxConnector, AppBreadcrumbsStoreProps} from "./AppBreadcrumbs_redux";

export const AppBreadcrumbs = React.memo(reduxConnector(function AppBreadcrumbs(props: AppBreadcrumbsProps & AppBreadcrumbsStoreProps) {
    const {state} = props.routerDetails;
    const currentRoute = getCurrentRoutes(state, {filterInitial:true}).pop();
    return <Body testID={props.testID}>
        <Title style={{
            marginLeft: 0
        }}>{readableRoute(currentRoute?.name || '')}</Title>
    </Body>;
}));
export default AppBreadcrumbs;
