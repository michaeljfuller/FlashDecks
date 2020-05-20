import React from "react";
import NavigatorContainer from "../../NavigationContainer";
import {NavigatorBase} from "../NavigatorBase";
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
        return <NavigatorContainer testID={TestID.Root}>
            {this.renderContents()}
        </NavigatorContainer>;
    }

    /** Render the contents of the selected route. */
    renderContents() {
        const NavigatorContents = this.navigator;
        return (<NavigatorContainer testID={TestID.Contents}>
            <NavigatorContents navigation={this.props.navigation} />
        </NavigatorContainer>);
    }
}
