import React from "react";
import {Body, Title} from 'native-base';

import {readableRoute} from "../../../routes";
import {AppBreadcrumbsProps, getCurrentRoutes} from './AppBreadcrumbs.common';

export const AppBreadcrumbs = React.memo(function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {state} = props.routerDetails;
    const currentRoute = getCurrentRoutes(state, {filterInitial:true}).pop();
    return <Body>
        <Title style={{
            marginLeft: 0
        }}>{readableRoute(currentRoute?.name || '')}</Title>
    </Body>;
});
export default AppBreadcrumbs;
