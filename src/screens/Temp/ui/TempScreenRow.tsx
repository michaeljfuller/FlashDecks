import React from "react";
import {View} from "react-native";

function RawTempScreenRow(props: React.PropsWithChildren<{
    borderColor?: string;
    backgroundColor?: string;
    marginHorizontal?: number;
    marginVertical?: number;
    borderWidth?: number;
    column?: boolean;
}>) {
    const {
        borderColor = 'black',
        marginHorizontal = 0,
        marginVertical = 2,
        borderWidth = 1,
        backgroundColor = 'white',
        column,
    } = props;
    return <View style={{
        marginHorizontal,
        marginVertical,
        borderColor,
        borderWidth,
        backgroundColor,
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: column ? 'column' : 'row'
    }}>{props.children}</View>
}
export const TempScreenRow = React.memo(RawTempScreenRow);
export default TempScreenRow;
