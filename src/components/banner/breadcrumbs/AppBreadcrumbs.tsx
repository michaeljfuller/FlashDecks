import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {withStyles} from "@material-ui/core/styles";

import {getBaseRouteFromKey} from '../../../routes';
import TextButton, {TextButtonProps} from '../../button/TextButton';
import withDefaultProps from '../../../utils/hoc/withDefaultProps/withDefaultProps';
import {getCurrentRoutes} from '../../../navigation/navigation_utils';
import {AppBreadcrumbsProps} from './AppBreadcrumbs.common';
import {Color} from "../../../styles/Color";

export default function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {navigation} = props;
    const currentRoutes = getCurrentRoutes(navigation);
    const lastRoute = currentRoutes[currentRoutes.length-1]; // Get the top-most route in the current stack
    const lastBaseRouteKey = lastRoute ? getBaseRouteFromKey(lastRoute.key) : ''; // Get the leaf route from that

    const items = currentRoutes.map(route => {
        const targetRouteKey = getBaseRouteFromKey(route.key); // Get the leaf route for this route
        return <BreadcrumbButton
            key={route.key}
            title={route.routeName}
            disabled={targetRouteKey === lastBaseRouteKey}
            onClick={() => navigation.navigate(targetRouteKey)}
        />;
    });

    return <StyledBreadcrumbs maxItems={3}>{items}</StyledBreadcrumbs>;
}

export const BreadcrumbButton = withDefaultProps(TextButton, {
    color: "White"
} as TextButtonProps) as typeof TextButton;

const StyledBreadcrumbs = withStyles({
    separator: { color: Color.White  }
})(Breadcrumbs) as typeof Breadcrumbs;
