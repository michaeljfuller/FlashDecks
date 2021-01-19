import React from "react";
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import logger from "../../utils/Logger";
import Row from "../layout/Row";

let nextComponentId = 1;

export interface DebugLoggerProps {
    logConstructor?: boolean;
    logDidMount?: boolean;
    logDidUpdate?: boolean;
    logWillUnmount?: boolean;
    logShouldUpdate?: boolean;
    logRender?: boolean;
    hide?: boolean;
    style?: StyleProp<ViewStyle>;
    label?: string;
}

/**
 * A component that can log if it's being updated.
 */
export class UpdateLogger extends React.Component<DebugLoggerProps> {
    readonly id = nextComponentId++;
    private renderCount = 0;
    get name(): string {
        let result = this.constructor.name+'#'+this.id;
        if (this.props.label) result += ` (${this.props.label})`;
        return result;
    }

    private log(...items: any[]) {
        const log = logger.yellow.add(this.constructor.name+'#'+this.id);
        if (this.props.label) log.add(` (${this.props.label})`);
        log.info(':', ...items);
    }

    constructor(props: Readonly<DebugLoggerProps>) {
        super(props);
        if (this.props.logConstructor) this.log('constructor');
    }

    componentDidMount() {
        if (this.props.logDidMount) this.log('componentDidMount');
    }
    componentDidUpdate(/*prevProps: Readonly<DebugLoggerProps>, prevState: Readonly<{}>, snapshot?: any*/) {
        if (this.props.logDidUpdate) this.log('componentDidUpdate');
    }
    componentWillUnmount() {
        if (this.props.logWillUnmount) this.log('componentWillUnmount');
    }
    shouldComponentUpdate(/*nextProps: Readonly<DebugLoggerProps>, nextState: Readonly<{}>, nextContext: any*/): boolean {
        if (this.props.logDidUpdate) this.log('shouldComponentUpdate');
        return true;
    }
    render() {
        const {
            logRender=false,
            hide=false,
            label,
            style,
        } = this.props;
        this.renderCount++;

        if (logRender) this.log('render');
        if (hide) return null;

        const rootStyles: StyleProp<ViewStyle> = [styles.root];
        if (style) Array.isArray(style) ? rootStyles.push(...style) : rootStyles.push(style);
        return <View style={rootStyles}>
            <Text style={styles.title}>{this.constructor.name+'#'+this.id}</Text>
            <Row space>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.count}>{this.renderCount}</Text>
            </Row>
        </View>;
    }

}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        opacity: 0.5,
        backgroundColor: "white",
        padding: 2,
        borderWidth: 1,
        borderStyle: "dotted",
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
    },
    label: {

    },
    count: {
        textAlign: "right",
    },
});
