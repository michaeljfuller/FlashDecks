import React from "react";
import {View} from "react-native";
import ProgressBar from "../../../components/progress/ProgressBar";
import ProgressCircle from "../../../components/progress/ProgressCircle";
import TempScreenSubsection from "../ui/TempScreenSubsection";

export function TempScreenProgress() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => setProgress(
            (prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10)
        ), 500);
        return () => clearInterval(timer);
    }, []);

    return <TempScreenSubsection title="Progress">
        <View style={{ flexDirection: "row", marginBottom: 2 }}>
            <ProgressCircle radius={50} />
            <ProgressCircle value={progress} maxValue={100} color={"Red"} style={{ opacity: 0.5, position: "absolute", left: 5, top: 5 }} />
        </View>
        <ProgressBar value={1.00} color="Green"  />
        <ProgressBar value={0.20} color="Orange" />
        <ProgressBar value={0.05} color="Red"    />
        <ProgressBar value={0.00} color="Grey"   />
        <ProgressBar style={{paddingVertical:2}} />
    </TempScreenSubsection>;
}
export default TempScreenProgress;
