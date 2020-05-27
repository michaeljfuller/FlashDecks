import React from "react";
import {Body, Subtitle, Title} from 'native-base';

import {getCurrentRoutes} from '../../../navigation/navigation_utils';
import {AppBreadcrumbsProps} from './AppBreadcrumbs.common';

export default function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {navigation} = props;
    const currentRoute = getCurrentRoutes(navigation).pop();
    return <Body>
        <Title style={{
            marginLeft: 0
        }}>{currentRoute?.routeName}</Title>
    </Body>;
}
