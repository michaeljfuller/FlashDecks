import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {withStyles} from "@material-ui/core/styles";

import TextButton, {TextButtonProps} from '../../button/TextButton';
import withDefaultProps from '../../../utils/hoc/withDefaultProps/withDefaultProps';
import {AppBreadcrumbsProps} from './AppBreadcrumbs.common';
import {Color} from "../../../styles/Color";

export default function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {navigation, state, descriptors} = props.routerDetails;

    const items = navigation && [] as React.ReactElement[];

    /*
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
    */

    const route = state.routes[state.index];
    const descriptor = descriptors[route.key];
    items.push(<BreadcrumbButton
        key={route.key}
        title={descriptor.options.title}
        disabled
    />);

    return <StyledBreadcrumbs maxItems={3}>{items}</StyledBreadcrumbs>;
}

export const BreadcrumbButton = withDefaultProps(TextButton, {
    color: "White"
} as TextButtonProps) as typeof TextButton;

const StyledBreadcrumbs = withStyles({
    separator: { color: Color.White  }
})(Breadcrumbs) as typeof Breadcrumbs;
