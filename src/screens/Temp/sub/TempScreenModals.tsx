import React from "react";
import {Text, TextInput, View} from "react-native";
import Button, {IconType} from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import {repeat} from "../../../utils/array";
import {DebugModal} from "../../../components/modal/DebugModal/DebugModal";
import {AlertModal} from "../../../components/modal/AlertModal/AlertModal";
import {PromptModal} from "../../../components/modal/PromptModal/PromptModal";
import {ProgressModal, ProgressModalProps} from "../../../components/modal/ProgressModal/ProgressModal";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import Row from "../../../components/layout/Row";

export function TempScreenModals() {
    const [showDebugModal,  setShowDebugModal ] = React.useState(false);
    const [showAlertModal,  setShowAlertModal ] = React.useState(false);
    const [showPromptModal, setShowPromptModal] = React.useState(false);

    const toggleDebugModal  = React.useCallback(() => setShowDebugModal( !showDebugModal ), [showDebugModal ]);
    const toggleAlertModal  = React.useCallback(() => setShowAlertModal( !showAlertModal ), [showAlertModal ]);
    const togglePromptModal = React.useCallback(() => setShowPromptModal(!showPromptModal), [showPromptModal]);

    const hideDebugModal  = React.useCallback(() => setShowDebugModal( false), []);
    const hideAlertModal  = React.useCallback(() => setShowAlertModal( false), []);
    const hidePromptModal = React.useCallback(() => setShowPromptModal(false), []);

    const [promptCounter, setPromptCounter] = React.useState(0);
    const incPromptCounter = React.useCallback(() => setPromptCounter(promptCounter+1), [promptCounter]);

    return <TempScreenSubsection title="Modals" description="Various Modal types to open.">

            <TextButton title="showDebugModal" onClick={toggleDebugModal} />
            <DebugModal
                open={showDebugModal}
                onClose={hideDebugModal}
                title="Test Modal"
                data={repeat(75, i => 48 + i).map(code => ({ code, character: String.fromCharCode(code) }))}
            >
                <Text>Character Codes</Text>
            </DebugModal>

            <TextButton title="showAlertModal" onClick={toggleAlertModal} />
            <AlertModal
                open={showAlertModal}
                onClose={hideAlertModal}
                title="Alert"
                message="Message"
            >
                <Text>AlertModal Contents</Text>
                <View style={{ borderWidth: 1, paddingHorizontal: 1 }}>
                    <TextInput multiline />
                </View>
                <TextButton title="showDebugModal" onClick={toggleDebugModal} />
            </AlertModal>

            <TextButton title={'showPromptModal | Count: ' + promptCounter} onClick={togglePromptModal} />
            <PromptModal
                open={showPromptModal}
                onOk={incPromptCounter}
                onClose={hidePromptModal}
                title="PromptModal"
                message="Increment count?"
            >
                <Text>Count: {promptCounter}</Text>
            </PromptModal>

            <TempScreenProgressModal type="bar" />
            <TempScreenProgressModal type="circle" />

        </TempScreenSubsection>;
}
export default TempScreenModals;

function TempScreenProgressModal({type}: {type: ProgressModalProps['type']}) {

    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = React.useCallback(() => setShowModal(!showModal), [showModal]);
    const hideModal = React.useCallback(() => setShowModal(false), []);

    const progressStep = 15;
    const progressMin = 10;
    const progressMax = 100;
    const [progress, setProgress] = React.useState<boolean|number>(progressMin);

    const incProgress = React.useCallback(() => {
        typeof progress === "number" ? setProgress(Math.min(progressMax, progress + progressStep)) : setProgress(progressMin);
    }, [progress]);

    const decProgress = React.useCallback(() => {
        typeof progress === "number" ? setProgress(Math.max(progressMin, progress - progressStep)) : setProgress(progressMin);
    }, [progress]);

    const title = `ProgressModal (${type})`;

    return <React.Fragment>
        <TextButton title={title} onClick={toggleModal} />
        <ProgressModal
            open={showModal}
            onClose={hideModal}
            title={title}
            footer={typeof progress === "number" ? `${progress}%` : `${progress ? 'Indeterminate' : 'Hidden'}`}
            type={type}
            value={progress}
            maxValue={progressMax}
        >
            <Row center>
                <Text>Set progress value</Text>
            </Row>
            <Row center wrap style={{marginVertical: 5}}>
                <Button icon={IconType.Cancel} square width={40} onClick={() => setProgress(false)} disabled={progress === false} />
                <Button title={'∞'}            square width={40} onClick={() => setProgress(true)}  disabled={progress === true} />
                <Button icon={IconType.Remove} square width={40} onClick={decProgress} disabled={typeof progress === "number" && progress <= progressMin} />
                <Button icon={IconType.Add}    square width={40} onClick={incProgress} disabled={typeof progress === "number" && progress >= progressMax} />
            </Row>
        </ProgressModal>
    </React.Fragment>;
}
