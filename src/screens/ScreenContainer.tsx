import React, {PropsWithChildren} from "react";
import Column, {ColumnProps} from "../components/layout/Column";

export interface ScreenContainerProps extends ColumnProps {
}

export default function ScreenContainer(props: PropsWithChildren<ScreenContainerProps>) {
    const {children, scroll=true, ...columnProps} = props;
    return <Column scroll={scroll} {...columnProps}>
        {children}
    </Column>;
}
