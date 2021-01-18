import React from "react";
import {Text, View} from "react-native";
import ImmutablePureComponent from "../../components/ImmutablePureComponent";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, TempScreenStoreProps} from "./TempScreen_redux";
import {envName} from "../../env";

import {logComponent} from "../../utils/debugging";
import TempScreenMediaPickers from "./sub/TempScreenMediaPickers";
import TempScreenProgress from "./sub/TempScreenProgress";
import TempScreenPortals from "./sub/TempScreenPortals";
import TempScreenButtons from "./sub/TempScreenButtons";
import TempScreenContext from "./sub/TempScreenContext";
import TempScreenModals from "./sub/TempScreenModals";
import TempScreenToggle from "./ui/TempScreenToggle";
import TempScreenMisc from "./sub/TempScreenMisc";
import Row from "../../components/layout/Row";

export enum TestIds {
    User='TempScreen_User',
    Env='TempScreen_Env'
}

export type TempScreenProps = NavigationScreenProps;
export type TempScreenState = Readonly<{
    showProgress: boolean;
    showMediaPickers: boolean;
    showPortals: boolean;
    showButtons: boolean;
    showContext: boolean;
    showModals: boolean;
    showMisc: boolean;
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
        showProgress: true,
        // showMediaPickers: true,
        // showPortals: true,
        // showButtons: true,
        // showContext: true,
        showModals: true,
        // showMisc: true,
    } as TempScreenState;

    toggleProgress = () => this.setStateTo({showProgress: !this.state.showProgress});
    toggleMediaPickers = () => this.setStateTo({showMediaPickers: !this.state.showMediaPickers});
    togglePortals = () => this.setStateTo({showPortals: !this.state.showPortals});
    toggleButtons = () => this.setStateTo({showButtons: !this.state.showButtons});
    toggleContext = () => this.setStateTo({showContext: !this.state.showContext});
    toggleModals = () => this.setStateTo({showModals: !this.state.showModals});
    toggleMisc = () => this.setStateTo({showMisc: !this.state.showMisc});

    render() {
        const {loggedInUser} = this.props;
        return (
            <ScreenContainer style={{ paddingHorizontal: 10 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                    <Text testID={TestIds.User}>User: {loggedInUser && loggedInUser.displayName || '?'}</Text>
                    <Text testID={TestIds.Env}>Environment: &quot;{envName}&quot;</Text>
                </View>

                <Row wrap>
                    <TempScreenToggle title="Progress" onClick={this.toggleProgress}     value={this.state.showProgress} />
                    <TempScreenToggle title="Media"    onClick={this.toggleMediaPickers} value={this.state.showMediaPickers} />
                    <TempScreenToggle title="Portals"  onClick={this.togglePortals}      value={this.state.showPortals} />
                    <TempScreenToggle title="Buttons"  onClick={this.toggleButtons}      value={this.state.showButtons} />
                    <TempScreenToggle title="Context"  onClick={this.toggleContext}      value={this.state.showContext} />
                    <TempScreenToggle title="Modals"   onClick={this.toggleModals}       value={this.state.showModals} />
                    <TempScreenToggle title="Misc"     onClick={this.toggleMisc}         value={this.state.showMisc} />
                </Row>

                {this.state.showProgress ? <TempScreenProgress /> : null}
                {this.state.showMediaPickers ? <TempScreenMediaPickers /> : null}
                {this.state.showPortals ? <TempScreenPortals /> : null}
                {this.state.showButtons ? <TempScreenButtons /> : null}
                {this.state.showContext ? <TempScreenContext /> : null}
                {this.state.showModals ? <TempScreenModals /> : null}
                {this.state.showMisc ? <TempScreenMisc /> : null}

            </ScreenContainer>
        );
    }

}

export default reduxConnector(TempScreen);
