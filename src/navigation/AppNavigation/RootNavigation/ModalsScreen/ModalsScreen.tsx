import React from "react";
import {Text} from "react-native";
import {NavigationScreenProps} from "../../../navigation_types";
import {PortalExit} from "../../../../components/portal/PortalExit";
import {modalPortalId} from "../../../../components/modal/core/Modal.common";
import {ModalsScreenProps} from "../actions";

export function ModalsScreen(_: ModalsScreenProps & NavigationScreenProps) {
    return <PortalExit portalId={modalPortalId}>
        <Text>No modal found.</Text>
    </PortalExit>;
}
export default ModalsScreen;
