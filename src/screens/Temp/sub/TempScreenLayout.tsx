import React from "react";
import {StyleSheet, Text} from "react-native";
import {Button} from "../../../components/button/Button";
import {padNumber} from "../../../utils/string";
import {repeat} from "../../../utils/array";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import Row from "../../../components/layout/Row";
import Column from "../../../components/layout/Column";
import {UpdateLogger} from "../../../components/debugging/UpdateLogger";
import {Visibility} from "../../../components/layout/Visibility";
import {Position} from "../../../components/layout/Position";

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
        return <TempScreenSubsection title="Layout" description="Various Layout component arrangements.">

            <Text>Visibility Component</Text>
            <Row style={{height: 50}}>
                <Button square width={100} title={this.state.showUpdateLogger   ? 'Hide'   : 'Show'  } onClick={this.toggleShowUpdateLogger} />
                <Button square width={100} title={this.state.renderUpdateLogger ? 'Remove' : 'Render'} onClick={this.toggleRenderUpdateLogger} />
                <Row flex style={{borderWidth:1, padding: 2}}>
                    <Visibility visible={this.state.showUpdateLogger} render={this.state.renderUpdateLogger}>
                        <UpdateLogger label="Misc" logConstructor logDidMount logWillUnmount logShouldUpdate logDidUpdate logRender />
                    </Visibility>
                </Row>
            </Row>

            <Text>Position Component</Text>
            <Column style={{borderWidth:1}}>
                <Row style={{ height: 50}}>
                    <Position flex style={{borderWidth:1}} vertical="top" horizontal="left">
                        <Text style={styles.blueTextBox}>Top Left</Text>
                    </Position>
                    <Position flex style={{borderWidth:1}} vertical="top">
                        <Text style={styles.blueTextBox}>Top</Text>
                    </Position>
                    <Position flex style={{borderWidth:1}} vertical="top" horizontal="right">
                        <Text style={styles.blueTextBox}>Top Right</Text>
                    </Position>
                </Row>
                <Row style={{ height: 50}}>
                    <Position flex style={{borderWidth:1}} horizontal="left">
                        <Text style={styles.blueTextBox}>Left</Text>
                    </Position>
                    <Position flex style={{borderWidth:1}} >
                        <Text style={styles.blueTextBox}>Center</Text>
                    </Position>
                    <Position flex style={{borderWidth:1}} horizontal="right">
                        <Text style={styles.blueTextBox}>Right</Text>
                    </Position>
                </Row>
                <Row style={{ height: 50}}>
                    <Position flex style={{borderWidth:1}} vertical="bottom" horizontal="left">
                        <Text style={styles.blueTextBox}>Bottom Left</Text>
                    </Position>
                    <Position flex style={{borderWidth:1}} vertical="bottom">
                        <Text style={styles.blueTextBox}>Bottom</Text>
                    </Position>
                    <Position flex style={{borderWidth:1}} vertical="bottom" horizontal="right">
                        <Text style={styles.blueTextBox}>Bottom Right</Text>
                    </Position>
                </Row>
            </Column>

            <Text>Centering Row & Column</Text>
            <Row style={{ height: 60 }}>
                <Row center flex style={{ borderWidth: 1, margin: 2 }}>
                    <Column center style={{ borderLeftWidth: 1, borderRightWidth: 1 }}>
                        <Text style={styles.blueTextBox}>Row & Column</Text>
                    </Column>
                </Row>
                <Column center flex style={{ borderWidth: 1, margin: 2 }}>
                    <Row center style={{ borderTopWidth: 1, borderBottomWidth: 1 }}>
                        <Text style={styles.blueTextBox}>Column & Row</Text>
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
    dottedBorder: {
        borderWidth: 1,
        borderStyle: "dotted",
    },
    blueTextBox: {
        backgroundColor: '#79F',
        textAlign: "center",
        padding: 5,
        width: 120,
    },
    bigBlue: {
        fontSize: 40,
        textAlign: 'center',
        color: '#79F',
        marginHorizontal: 7,
    },
});
