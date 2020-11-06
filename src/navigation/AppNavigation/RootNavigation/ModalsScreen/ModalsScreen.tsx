import React from "react";
import {Text, View} from "react-native";
import {NavigationScreenProps} from "../../../navigation_types";
import Button from "../../../../components/button/Button";
import {PortalExit} from "../../../../components/portal/PortalExit";
import {modalPortalId} from "../../../../components/modal/core/Modal.common";
import {ModalsScreenProps, navigateFromModal} from "../actions";

export function ModalsScreen(_: ModalsScreenProps & NavigationScreenProps) {
    return <PortalExit portalId={modalPortalId}>
        <View style={{ height: '100%', padding: 5 }}>
            <Text>No modal found.</Text>
        </View>
        <Button title="Close" onClick={navigateFromModal} square style={{
            position: "absolute",
            bottom: 0,
        }} />
    </PortalExit>;
}
export default ModalsScreen;
