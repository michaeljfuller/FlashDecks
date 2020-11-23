import React from "react";
import {Text, View, BackHandler, NativeEventSubscription} from "react-native";
import {NavigationScreenProps} from "../../../navigation_types";
import portalStore from "../../../../store/portals/PortalStore";
import Button from "../../../../components/button/Button";
import {PortalExit} from "../../../../components/portal/PortalExit";
import {modalPortalId} from "../../../../components/modal/core/Modal.common";
import {ModalsScreenProps, navigateFromModal} from "../actions";

export class ModalsScreen extends React.PureComponent<ModalsScreenProps & NavigationScreenProps> {

    hardwareBackPress?: NativeEventSubscription;

    componentDidMount() {
        this.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }
    componentWillUnmount() {
        this.hardwareBackPress?.remove();
    }

    onBackPress() {
        portalStore.getEntrances(modalPortalId)[0]?.close(); // Close the current entrance.
        return true; // Prevent default
    }

    render() {
        return <PortalExit portalId={modalPortalId} onEmpty={navigateFromModal}>
            <View style={{ height: '100%', padding: 5 }}>
                <Text>No modal found.</Text>
            </View>
            <Button title="Close" onClick={navigateFromModal} square style={{
                position: "absolute",
                bottom: 0,
            }} />
        </PortalExit>;
    }
}
export default ModalsScreen;
