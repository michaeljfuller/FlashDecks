import React from "react";
import {Body, Title} from 'native-base';

import {AppBreadcrumbsProps, getCurrentRoutes} from './AppBreadcrumbs.common';

export default function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {state} = props.routerDetails;
    const currentRoute = getCurrentRoutes(state, {filterInitial:true}).pop();
    return <Body>
        <Title style={{
            marginLeft: 0
        }}>{currentRoute?.name || ''}</Title>
    </Body>;
}
