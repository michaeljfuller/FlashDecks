import React, {PureComponent, ErrorInfo} from 'react';
import {StyleSheet, Text, View} from "react-native";

interface ErrorBoundaryProps {}
interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

/**
 * Wrap this around another component to catch errors thrown by it, or its children.
 */
class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
    static readonly defaultMessage = 'An error has occurred';

    state = {
        hasError: false,
        errorMessage: ''
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            errorMessage: error.message
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`ErrorBoundary.tsx - ${error.name}: ${error.message} ${errorInfo.componentStack}\n`, error.stack);
    }

    render() {
        if (this.state.hasError) {
            return <Text style={styles.error}>{this.state.errorMessage || ErrorBoundary.defaultMessage}</Text>;
        } else {
            return this.props.children || <View></View>;
        }
    }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
    error: {
        color: 'red'
    }
});
