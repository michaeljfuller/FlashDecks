import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {withStyles} from "@material-ui/core/styles";

import TextButton, {TextButtonProps} from '../../button/TextButton';
import withDefaultProps from '../../../utils/hoc/withDefaultProps/withDefaultProps';
import {AppBreadcrumbsProps, getCurrentRoutes, navigateTo} from './AppBreadcrumbs.common';
import {Color} from "../../../styles/Color";
import {readableRoute} from "../../../routes";

export const AppBreadcrumbs = React.memo(function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {navigation, state, initialRouteName} = props.routerDetails;
    const initialRoute = state.routes.find(route => route.name === initialRouteName) || state.routes[0];
    const currentRoutes = getCurrentRoutes(state, {filterInitial:true});

    // Convert routes to breadcrumbs
    const items = currentRoutes.map((route, index) => {
        return <BreadcrumbButton
            key={route.key}
            title={readableRoute(route.name)}
            disabled={index+1 >= currentRoutes.length}
            onClick={() => navigateTo(currentRoutes.slice(0, index+1), navigation)}
        />;
    });

    // Add Home to breadcrumbs
    if (!currentRoutes.length || currentRoutes[0].key !== initialRoute.key) {
        items.unshift(<BreadcrumbButton
            key={initialRoute.key}
            title={readableRoute(initialRoute.name)}
            disabled={currentRoutes.length === 0}
            onClick={() => navigateTo([initialRoute], navigation)}
        />)
    }

    return <StyledBreadcrumbs maxItems={3}>{items}</StyledBreadcrumbs>;
});
export default AppBreadcrumbs;

export const BreadcrumbButton = withDefaultProps(TextButton, {
    color: "White"
} as TextButtonProps) as typeof TextButton;

const StyledBreadcrumbs = withStyles({
    separator: { color: Color.White  }
})(Breadcrumbs) as typeof Breadcrumbs;
