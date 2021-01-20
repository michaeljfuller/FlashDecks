import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "../../../components/button/Button";
import {ToastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import {ToastQueueItem} from "../../../store/toast/toast_actions";
import {randomIntString} from "../../../utils/math";
import {padNumber} from "../../../utils/string";
import {repeat} from "../../../utils/array";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import Row from "../../../components/layout/Row";
import Column from "../../../components/layout/Column";
import {UpdateLogger} from "../../../components/debugging/UpdateLogger";
import {Visibility} from "../../../components/layout/Visibility";
import HR from "../../../components/ui/HR";

interface TempScreenLayoutProps {}
interface TempScreenLayoutState {
    showUpdateLogger: boolean;
    renderUpdateLogger: boolean;
}
export class TempScreenLayout extends React.PureComponent<TempScreenLayoutProps, TempScreenLayoutState> {
    state: TempScreenLayoutState = {
        showUpdateLogger: true,
        renderUpdateLogger: true,
    };

    toggleShowUpdateLogger = () => this.setState({ showUpdateLogger: !this.state.showUpdateLogger });
    toggleRenderUpdateLogger = () => this.setState({ renderUpdateLogger: !this.state.renderUpdateLogger });

    render() {
        return <TempScreenSubsection title="Layout">

            <Text>Visibility</Text>
            <Row>
                <Button flex square title={this.state.showUpdateLogger   ? 'Hide'   : 'Show'  } onClick={this.toggleShowUpdateLogger} />
                <Button flex square title={this.state.renderUpdateLogger ? 'Remove' : 'Render'} onClick={this.toggleRenderUpdateLogger} />
            </Row>
            <Row center style={{height: 50, borderWidth:1, paddingTop: 2}}>
                <Visibility visible={this.state.showUpdateLogger} render={this.state.renderUpdateLogger}>
                    <UpdateLogger label="Misc" style={{width: 150, left:-150/2}}
                        logConstructor logDidMount logWillUnmount logShouldUpdate logDidUpdate logRender
                    />
                </Visibility>
            </Row>

            <Text>Centering Row & Column</Text>
            <Row style={{ height: 60 }}>
                <Row center style={{ flex:1, borderWidth: 1, margin: 2 }}>
                    <Column center style={{ borderLeftWidth: 1, borderRightWidth: 1 }}>
                        <Text style={{ backgroundColor: '#79F', textAlign: "center", padding: 5 }}>Row & Column</Text>
                    </Column>
                </Row>
                <Column center style={{ flex:1, borderWidth: 1, margin: 2 }}>
                    <Row center style={{ borderTopWidth: 1, borderBottomWidth: 1 }}>
                        <Text style={{ backgroundColor: '#79F', textAlign: "center", padding: 5 }}>Column & Row</Text>
                    </Row>
                </Column>
            </Row>


            <Text>Scrolling Row & Column</Text>
            <Row center>
                <Row scroll style={{margin: 2, borderWidth: 1, maxWidth: '70%'}}>
                    {repeat(50, index => <Text key={index} style={styles.bigBlue}>{padNumber(index+1, 2)}</Text>)}
                </Row>
            </Row>
            <Row style={{borderWidth: 1, borderBottomWidth: 0, marginHorizontal: 2, marginTop: 2}}>
                <Text style={{textAlign: "center", fontWeight: "bold", flex:1, borderRightWidth: 1}}>Scroll, Center & Space</Text>
                <Text style={{textAlign: "center", fontWeight: "bold", flex:1}}>Scroll & Center</Text>
            </Row>
            <Row style={{height: 150, marginHorizontal: 2, borderWidth: 1}}>
                <Column scroll center space style={{ borderRightWidth: 1 }}>
                    {repeat(3, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
                <Column scroll center space style={{ borderRightWidth: 1 }}>
                    {repeat(20, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
                <Column scroll center style={{ borderRightWidth: 1 }}>
                    {repeat(3, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
                <Column scroll center>
                    {repeat(20, index => <Text key={index} style={styles.centerText}>{padNumber(index+1, 2)}</Text>)}
                </Column>
            </Row>


            <Text>Row Right & Reverse</Text>
            <Row>
                <Row flex right style={{borderWidth: 1, marginHorizontal: 2}}>
                    {repeat(3, index => <Text key={index} style={styles.bigBlue}>{index+1}</Text>)}
                </Row>
                <Row flex reverse style={{borderWidth: 1, marginHorizontal: 2}}>
                    {repeat(3, index => <Text key={index} style={styles.bigBlue}>{index+1}</Text>)}
                </Row>
            </Row>


            <Text>Column Bottom & Reverse</Text>
            <Row style={{height: 80}}>
                <Column flex bottom style={{borderWidth: 1, marginHorizontal: 2}}>
                    {repeat(3, index => <Text key={index}>{index+1}</Text>)}
                </Column>
                <Column flex reverse style={{borderWidth: 1, marginHorizontal: 2}}>
                    {repeat(3, index => <Text key={index}>{index+1}</Text>)}
                </Column>
                <Column flex bottom style={{borderWidth: 1, marginHorizontal: 2}} scroll>
                    {repeat(10, index => <Text key={index}>{index+1}</Text>)}
                </Column>
                <Column flex reverse style={{borderWidth: 1, marginHorizontal: 2}} scroll>
                    {repeat(10, index => <Text key={index}>{index+1}</Text>)}
                </Column>
            </Row>


        </TempScreenSubsection>;
    }
}
export default TempScreenLayout;

const styles = StyleSheet.create({
    centerText: {
        textAlign: "center"
    },
    bigBlue: {
        fontSize: 40,
        textAlign: 'center',
        color: '#79F',
        marginHorizontal: 7,
    },
});
