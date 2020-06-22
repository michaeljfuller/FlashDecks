import React, {Provider} from "react";
import {Text} from "react-native";
import {ModalComponent, ModalComponentMap} from "../createModals";
import ModalManager from "./ModalManager";
import ModalRenderer from "./ModalRenderer";

interface ModalSelectorProps<ModalKey extends string|number> {
    Provider: Provider<ModalManager<ModalKey>>;
    modals: ModalComponentMap;
}
interface ModalSelectorState<ModalKey extends string|number> {
    currentKey: ModalKey|undefined;
    currentPayload: any;
    currentContents?: React.ReactChildren;
}

export class ModalSelector<ModalKey extends string|number> extends React.Component<
    ModalSelectorProps<ModalKey>,
    ModalSelectorState<ModalKey>
> {
    state = {} as ModalSelectorState<ModalKey>;
    dispatcher = new ModalManager<ModalKey>(this);

    render() {
        const {Provider, modals} = this.props;
        const {currentKey, currentPayload, currentContents} = this.state;
        const CurrentModal = currentKey && modals[currentKey] as ModalComponent;

        return <Provider value={this.dispatcher}>
            <Text>Modals: [{Object.keys(this.props.modals).join(', ')}]</Text>
            <Text>Current: {currentKey} - {JSON.stringify(currentPayload)}</Text>
            {this.props.children}
            <ModalRenderer
                Component={CurrentModal}
                modalKey={currentKey}
                payload={currentPayload}
                contents={currentContents}
            />
        </Provider>;
    }
}
export default ModalSelector;
