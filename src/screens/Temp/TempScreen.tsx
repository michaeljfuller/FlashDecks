import React from "react";
import {Text, View} from "react-native";
import ImmutablePureComponent from "../../components/ImmutablePureComponent";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, TempScreenStoreProps} from "./TempScreen_redux";

import Row from "../../components/layout/Row";
import {logComponent} from "../../utils/debugging";

import TempScreenMediaPickers from "./sub/TempScreenMediaPickers";
import TempScreenProgress from "./sub/TempScreenProgress";
import TempScreenPortals from "./sub/TempScreenPortals";
import TempScreenButtons from "./sub/TempScreenButtons";
import TempScreenModals from "./sub/TempScreenModals";
import TempScreenToggle from "./ui/TempScreenToggle";
import TempScreenToast from "./sub/TempScreenToast";
import TempScreenLayout from "./sub/TempScreenLayout";

export type TempScreenProps = NavigationScreenProps;
export type TempScreenState = Readonly<{
    showLayout: boolean;
    showProgress: boolean;
    showMediaPickers: boolean;
    showPortals: boolean;
    showButtons: boolean;
    showModals: boolean;
    showToast: boolean;
}>;

@logComponent({
    logDidMount: {group: false},
    logDidUpdate: {collapsed: true}
})
export class TempScreen extends ImmutablePureComponent<
    TempScreenProps & TempScreenStoreProps,
    TempScreenState
> {
    readonly state = {
        // showLayout: true,
        // showProgress: true,
        // showMediaPickers: true,
        // showPortals: true,
        // showButtons: true,
        // showModals: true,
        // showToast: true,
    } as TempScreenState;

    toggleLayout = () => this.setStateTo({showLayout: !this.state.showLayout});
    toggleProgress = () => this.setStateTo({showProgress: !this.state.showProgress});
    toggleMediaPickers = () => this.setStateTo({showMediaPickers: !this.state.showMediaPickers});
    togglePortals = () => this.setStateTo({showPortals: !this.state.showPortals});
    toggleButtons = () => this.setStateTo({showButtons: !this.state.showButtons});
    toggleModals = () => this.setStateTo({showModals: !this.state.showModals});
    toggleToast = () => this.setStateTo({showToast: !this.state.showToast});

    render() {
        const openSections = [
            this.state.showLayout ? <TempScreenLayout key="Layout" /> : null,
            this.state.showProgress ? <TempScreenProgress key="Progress" /> : null,
            this.state.showMediaPickers ? <TempScreenMediaPickers key="MediaPickers" /> : null,
            this.state.showPortals ? <TempScreenPortals key="Portals" /> : null,
            this.state.showButtons ? <TempScreenButtons key="Buttons" /> : null,
            this.state.showModals ? <TempScreenModals key="Modals" /> : null,
            this.state.showToast ? <TempScreenToast key="Toast" /> : null,
        ].filter(v => v);

        return (
            <ScreenContainer style={{ paddingTop: 5, paddingHorizontal: 10, paddingBottom: 10 }}>
                <Row wrap>
                    <TempScreenToggle title="Layout"   onClick={this.toggleLayout}       value={this.state.showLayout} />
                    <TempScreenToggle title="Progress" onClick={this.toggleProgress}     value={this.state.showProgress} />
                    <TempScreenToggle title="Media"    onClick={this.toggleMediaPickers} value={this.state.showMediaPickers} />
                    <TempScreenToggle title="Portals"  onClick={this.togglePortals}      value={this.state.showPortals} />
                    <TempScreenToggle title="Buttons"  onClick={this.toggleButtons}      value={this.state.showButtons} />
                    <TempScreenToggle title="Modals"   onClick={this.toggleModals}       value={this.state.showModals} />
                    <TempScreenToggle title="Toast"    onClick={this.toggleToast}        value={this.state.showToast} />
                </Row>

                {openSections.length ? <View style={{marginBottom: 10}}>{openSections}</View> : <View style={{
                    marginTop: 8, paddingHorizontal: 5, borderWidth: 1, backgroundColor: 'white',
                }}>
                    <Text>This is a screen for viewing and testing components in isolation.</Text>
                    <Text>Click one of the above buttons to view its contents.</Text>
                </View>}

            </ScreenContainer>
        );
    }

}

export default reduxConnector(TempScreen);
