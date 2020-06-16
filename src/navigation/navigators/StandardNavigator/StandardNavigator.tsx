import React from "react";
import {NavigatorBase} from "../NavigatorBase";
import {View} from "react-native";
export * from '../setNavigator';

export enum TestID {
    Root = 'StandardNavigator_Root',
    Contents = 'StandardNavigator_Contents'
}

/**
 * The base class for creating a new TabNavigator with specific routes attached.
 * @example
 *      @setNavigator(createSwitchNavigator(routes, routeConfig))
 *      class MyNavigator extends StandardNavigator {
 *          state = { hiddenRouteKeys = ['some-page'] };
 *      }
 */
export abstract class StandardNavigator<Props = any, State = any> extends NavigatorBase<Props, State> {
    render() {
        return <View testID={TestID.Root} style={{ flex: 1 }}>
            {this.renderContents()}
        </View>;
    }

    /** Render the contents of the selected route. */
    renderContents() {
        const NavigatorContents = this.navigator;
        return (<View testID={TestID.Contents} style={{ flex: 1 }}>
            <NavigatorContents navigation={this.props.navigation} />
        </View>);
    }
}
