import React, {PropsWithChildren} from 'react';
import {ViewStyle, StyleSheet, StyleProp} from "react-native";
import Column, {ColumnProps} from "../../../layout/Column";

export interface ModalBodyProps extends ColumnProps {}

export function ModalBody(props: PropsWithChildren<ModalBodyProps>) {
    const {scroll=true, center=true, style, ...colProps} = props;
    const styleArray: StyleProp<ViewStyle> = [styles.root];
    if (style) Array.isArray(style) ? styleArray.push(...style) : styleArray.push(style);

    return <Column
        scroll={scroll}
        center={center}
        style={styleArray}
        {...colProps}
    >{props.children}</Column>;
}
export default ModalBody;

const styles = StyleSheet.create({
    root: {
        padding: 2,
        backgroundColor: 'white',
    },
});
