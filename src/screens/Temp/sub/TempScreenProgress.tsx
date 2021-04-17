import React from "react";
import {Text} from "react-native";
import ProgressBar from "../../../components/progress/ProgressBar";
import ProgressCircle from "../../../components/progress/ProgressCircle";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import Row from "../../../components/layout/Row";
import Column from "../../../components/layout/Column";
import Button, {IconType} from "../../../components/button/Button";

export function TempScreenProgress() {
    const [autoProgress, setAutoProgress] = React.useState(10);
    const [autoMode, setAutoMode] = React.useState(true);

    const progressStep = 15;
    const progressSpeed = 7;
    const progressMin = 10;
    const progressMax = 100;
    const [manualProgress, setManualProgress] = React.useState<number|undefined>(progressMin);

    React.useEffect(() => {
        const timer = setInterval(() => setAutoProgress(prevProgress => {
            return prevProgress >= progressMax ? 0 : Math.min(prevProgress + progressSpeed, progressMax);
        }), 1000);
        return () => clearInterval(timer);
    }, []);

    const progress = autoMode ? autoProgress : manualProgress;

    const incProgress = React.useCallback(() => {
        manualProgress ? setManualProgress(Math.min(progressMax, manualProgress+progressStep)) : setManualProgress(progressMin);
        setAutoMode(false);
    }, [manualProgress]);
    const decProgress = React.useCallback(() => {
        manualProgress ? setManualProgress(Math.max(progressMin, manualProgress-progressStep)) : setManualProgress(progressMin);
        setAutoMode(false);
    }, [manualProgress]);
    const setIndeterminate = React.useCallback(() => {
        setManualProgress(undefined);
        setAutoMode(false);
    }, []);
    const setAutomatic = React.useCallback(() => {
        setManualProgress(undefined);
        setAutoMode(true);
    }, []);

    return <TempScreenSubsection title="Progress" description="Progress indicators with controls to change value.">

        <Row>
            <Row style={{ marginBottom: 2 }}>
                <ProgressCircle size={50} color="Grey" />
                <ProgressCircle size={40} color="Blue"   style={{ position: "absolute", left:  5, top:  5 }} value={autoProgress} maxValue={progressMax} />
                <ProgressCircle size={30} color="Red"    style={{ position: "absolute", left: 10, top: 10 }} value={0.40} />
                <ProgressCircle size={20} color="Orange" style={{ position: "absolute", left: 15, top: 15 }} value={0.75} />
                <ProgressCircle size={10} color="Green"  style={{ position: "absolute", left: 20, top: 20 }} value={0.90} />
            </Row>
            <Column flex center space>
                <ProgressBar color="Black" />
                <ProgressBar color="Blue"   value={autoProgress} maxValue={progressMax} />
                <ProgressBar color="Green"  value={1.00} />
                <ProgressBar color="Orange" value={0.20} />
                <ProgressBar color="Red"    value={0.05} />
                <ProgressBar color="Grey"   value={0.00} />
            </Column>
        </Row>

        <Row style={{marginTop: 2, paddingTop: 5, borderTopWidth: 1}}>
            <Row center flex>
                <ProgressCircle value={progress} maxValue={progressMax} />
            </Row>
            <Column>
                <Row center>
                    <Button icon={IconType.Remove} square width={40} onClick={decProgress}      disabled={!autoMode && manualProgress !== undefined && manualProgress <= progressMin} />
                    <Button icon={IconType.Add}    square width={40} onClick={incProgress}      disabled={!autoMode && manualProgress !== undefined && manualProgress >= progressMax}  />
                    <Button title="∞"              square width={40} onClick={setIndeterminate} disabled={!autoMode && manualProgress === undefined} />
                    <Button title="⧗"              square width={40} onClick={setAutomatic}     disabled={autoMode} />
                </Row>
            </Column>
        </Row>
        <ProgressBar style={{marginTop:5}} value={progress} maxValue={progressMax} />
        <Row center>
            <Text>{progress === undefined ? 'Indeterminate' : `${progress}%`}</Text>
        </Row>

    </TempScreenSubsection>;
}
export default TempScreenProgress;
