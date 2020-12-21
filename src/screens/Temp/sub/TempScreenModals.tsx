import React from "react";
import {Text, TextInput, View} from "react-native";
import TextButton from "../../../components/button/TextButton";
import {repeat} from "../../../utils/array";
import {DebugModal} from "../../../components/modal/DebugModal/DebugModal";
import {AlertModal} from "../../../components/modal/AlertModal/AlertModal";
import TempScreenSubsection from "../ui/TempScreenSubsection";

export function TempScreenModals() {
    const [showDebugModal, setShowDebugModal] = React.useState(false);
    const [showAlertModal, setShowAlertModal] = React.useState(false);

    const toggleDebugModal = React.useCallback(() => setShowDebugModal(!showDebugModal), [showDebugModal]);
    const toggleAlertModal = React.useCallback(() => setShowAlertModal(!showAlertModal), [showAlertModal]);

    const hideDebugModal = React.useCallback(() => setShowDebugModal(false), []);
    const hideAlertModal = React.useCallback(() => setShowAlertModal(false), []);

    return <TempScreenSubsection title="Modals">

            <TextButton title={'showDebugModal ' + showDebugModal} onClick={toggleDebugModal} />
            <DebugModal
                open={showDebugModal}
                onClose={hideDebugModal}
                title="Test Modal"
                data={repeat(75, i => 48 + i).map(code => ({ code, character: String.fromCharCode(code) }))}
            >
                <Text>Character Codes</Text>
            </DebugModal>

            <TextButton title={'showAlertModal ' + showAlertModal} onClick={toggleAlertModal} />
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
                <TextButton title={'showDebugModal ' + showDebugModal} onClick={toggleDebugModal} />
            </AlertModal>

        </TempScreenSubsection>;
}
export default TempScreenModals;
