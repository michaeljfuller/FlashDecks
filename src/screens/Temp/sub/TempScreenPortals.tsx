import React from "react";
import {Text, View} from "react-native";
import {Button} from "../../../components/button/Button";
import Row from "../ui/TempScreenRow";
import {PortalEntrance} from "../../../components/portal/PortalEntrance";
import {PortalExit} from "../../../components/portal/PortalExit";
import TempScreenSubsection from "../ui/TempScreenSubsection";

export function TempScreenPortals() {
    const [portalValue, setPortalValue] = React.useState(0);

    const entrance = <PortalEntrance portalId="tempPortal" style={{ backgroundColor: 'yellow', padding: 2 }}>
        <Text style={{color: 'red'}}>Portal Value: {portalValue}</Text>
    </PortalEntrance>;
    const incValue = React.useCallback(
        () => setPortalValue(portalValue+1),
        [portalValue]
    );

    return <TempScreenSubsection title="Portals">
        <Row>
            <Button title="Inc Portal Value" onClick={incValue} square style={{flex:1}} />
            <View style={{ borderWidth: 1, borderColor: 'red', backgroundColor: 'pink', padding: 2 }}>
                <Text>Portal Entrance</Text>
                <View style={{ borderWidth: 1, flex: 1 }}>
                    {portalValue ? entrance : null}
                </View>
            </View>
            <View style={{ borderWidth: 2, borderColor: 'green', backgroundColor: 'lightgreen' }}>
                <Text>Portal Exit</Text>
                <PortalExit portalId="tempPortal" style={{ borderWidth: 1, padding: 2, margin: 2 }}>
                    <Text>No Content</Text>
                </PortalExit>
            </View>
        </Row>
    </TempScreenSubsection>;
}
export default TempScreenPortals;
