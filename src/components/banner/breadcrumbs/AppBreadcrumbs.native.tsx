import React from "react";
import {View} from "react-native";

import TextButton, {TextButtonProps} from '../../button/TextButton';
import withDefaultProps from '../../../utils/hoc/withDefaultProps/withDefaultProps';
import {getCurrentRoutes} from '../../../navigation/navigation_utils';
import {AppBreadcrumbsProps} from './AppBreadcrumbs.common';

export default function AppBreadcrumbs(props: AppBreadcrumbsProps) {
    const {navigation} = props;
    const currentRoutes = getCurrentRoutes(navigation);

    const items = currentRoutes.map(route => {
        return <BreadcrumbButton
            key={route.key}
            title={route.routeName}
            onClick={() => console.warn('TODO BreadcrumbButton click', route)}
        />;
    });

    return <View>{items}</View>;
}

export const BreadcrumbButton = withDefaultProps(TextButton, {
    style: {
        color: 'skyblue'
    }
} as TextButtonProps) as typeof TextButton;
