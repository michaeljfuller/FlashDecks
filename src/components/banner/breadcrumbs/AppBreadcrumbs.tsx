import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {withStyles} from "@material-ui/core/styles";

import TextButton, {TextButtonProps} from '../../button/TextButton';
import withDefaultProps from '../../../utils/hoc/withDefaultProps/withDefaultProps';
import {getCurrentRoutes} from '../../../navigation/navigation_utils';
import {AppBreadcrumbsProps} from './AppBreadcrumbs.common';
import {Color} from "../../../styles/Color";

export default function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {navigation} = props;
    const currentRoutes = getCurrentRoutes(navigation);
    const lastRoute = currentRoutes[currentRoutes.length-1]; // Get the top-most route in the current stack

    const items = currentRoutes.map(route => {
        return <BreadcrumbButton
            key={route.key}
            title={route.routeName}
            onClick={() => console.warn('TODO BreadcrumbButton click', route)}
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
