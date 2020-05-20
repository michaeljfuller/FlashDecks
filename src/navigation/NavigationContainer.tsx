import React from 'react';
import {View, ViewProps} from 'react-native';

/**
 * If a Navigator is wrapped in a view, that view must use Flex. This component handles that.
 * @see https://reactnavigation.org/docs/en/common-mistakes.html#wrapping-appcontainer-in-a-view-without-flex
 */
const NavigatorContainer = (props: ViewProps & {children?: any}) => {
    const style = Object.assign({flex: 1}, props.style);
    return <View {...props} style={style}>{props.children}</View>;
};
export default NavigatorContainer;
