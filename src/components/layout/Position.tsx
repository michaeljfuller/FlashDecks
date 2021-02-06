import React from "react";
import PropTypes from 'prop-types';
import Row, {RowProps} from "./Row";
import Column, {ColumnProps} from "./Column";
import {ComponentUnion, PropTypesMap} from "../../utils/component";
import {ViewStyle} from "react-native";

export type PositionProps = React.PropsWithChildren<{
    horizontal?: PositionHorizontal;
    horizontalScroll?: boolean;
    horizontalOptions?: RowProps;

    vertical?: PositionVertical;
    verticalScroll?: boolean;
    verticalOptions?: ColumnProps;

    flex?: boolean;
    style?: ViewStyle;
}>;
type PositionVertical = "top"|"bottom"|"center";
type PositionHorizontal = "left"|"right"|"center";

/**
 * A component for positioning its children vertically (top|bottom|center) and horizontally (left|right|center)
 */
export const Position: ComponentUnion<PositionProps> = React.memo(function Position(props: PositionProps) {
    const {
        horizontal="center",
        vertical="center",
        horizontalScroll,
        verticalScroll,
        verticalOptions,
        horizontalOptions,
        flex,
        style,
    } = props;
    return <Row {...(horizontalOptions||{})} center={horizontal==="center"} right={horizontal==="right"} scroll={horizontalScroll} flex={flex} style={style}>
        <Column {...(verticalOptions  ||{})} center={vertical  ==="center"} bottom={vertical==="bottom"} scroll={verticalScroll}>
            {props.children}
        </Column>
    </Row>;
});

Position.propTypes = {
    horizontal: PropTypes.string,
    horizontalScroll: PropTypes.bool,
    horizontalOptions: PropTypes.object,

    vertical: PropTypes.string,
    verticalScroll: PropTypes.bool,
    verticalOptions: PropTypes.object,

    flex: PropTypes.bool,
    style: PropTypes.object,

    children: PropTypes.node,
} as PropTypesMap<PositionProps>;

export default Position;
