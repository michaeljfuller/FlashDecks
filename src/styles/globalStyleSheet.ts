import {StyleSheet, ViewStyle} from "react-native";
import {isPlatformWeb} from "../platform";

type PointerStyle = ViewStyle & { cursor?: string };

export const styles = StyleSheet.create({
    pointer: isPlatformWeb ? { cursor: "pointer" } as PointerStyle : {},
    verticalResize: isPlatformWeb ? { cursor: "ns-resize" } as PointerStyle : {},
});
export default styles;
