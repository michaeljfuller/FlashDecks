import React from "react";
import {GenericClass, renameClass} from "../../class";
import {classColor} from "../debuggingOptions";
import logger from "../../Logger";
import {WrapAndLogFunctionOptions} from "../wrapAndLogFunction";
import {LogColor} from "../../logging/logColors";
import {logMethod} from "./logMethod";

type Component = React.ComponentClass<any>|React.PureComponent<any>;

export interface LogComponentOptions<C extends Component> {
    enabled?: boolean;
    ref?: (scope: C) => string;
    logDidMount?: boolean|WrapAndLogFunctionOptions<C>;
    logDidUpdate?: boolean|WrapAndLogFunctionOptions<C>;
    logWillUnmount?: boolean|WrapAndLogFunctionOptions<C>;
    logRender?: boolean|WrapAndLogFunctionOptions<C>;
    logProps?: boolean;
    logState?: boolean;
    color?: LogColor;
}

/** Log Component lifecycle events. */
export function logComponent<T extends Component>(options?: LogComponentOptions<T>) {
    const {
        enabled = true,
        ref,
        logDidMount = true,
        logDidUpdate = true,
        logWillUnmount = true,
        logRender = true,
        logProps = true,
        logState = true,
    } = options || {};

    return function (component: GenericClass<T>) {
        if (!enabled) return;

        const {
            color = classColor(component.name)
        } = options || {};
        const baseMethodOptions: WrapAndLogFunctionOptions = { ref, parentColor: color };

        class LoggedClass extends (component as any) {

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logDidMount === 'boolean' ? { enabled: logDidMount } : logDidMount
            ))
            componentDidMount() {
                const self: React.Component = this as any;
                if (logProps) logger.addLogRef(self).space.add('Props').info(self.props);
                if (logState) logger.addLogRef(self).space.add('State').info(self.state);
                super.componentDidMount && super.componentDidMount();
            }

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logDidUpdate === 'boolean' ? { enabled: logDidUpdate } : logDidUpdate
            ))
            componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
                const self: React.Component = this as any;
                if (logProps && prevProps !== self.props) logger.addLogRef(self).space.add('Props').info(self.props);
                if (logState && prevState !== self.state) logger.addLogRef(self).space.add('State').info(self.state);
                super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, snapshot);
            }

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logWillUnmount === 'boolean' ? { enabled: logWillUnmount } : logWillUnmount
            ))
            componentWillUnmount() {
                super.componentWillUnmount && super.componentWillUnmount();
            }

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logRender === 'boolean' ? { enabled: logRender } : logRender
            ))
            render() {
                return super.render();
            }
        }

        return renameClass(component.name, LoggedClass) as any;
    }
}
