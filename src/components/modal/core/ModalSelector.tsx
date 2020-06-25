import React, {Provider} from "react";
import {ModalTemplate, ModalTemplateMap, ModalContents} from "../createModals";
import ModalManager from "./ModalManager";
import ModalRenderer from "./ModalRenderer";

export interface ModalSelectorProps<ModalKey extends string|number> {
    Provider: Provider<ModalManager<ModalKey>>;
    modals: ModalTemplateMap;
}
export interface ModalSelectorState<ModalKey extends string|number> {
    currentKey: ModalKey|undefined;
    currentPayload: any;
    currentContents?: ModalContents;
}

export class ModalSelector<ModalKey extends string|number> extends React.Component<
    ModalSelectorProps<ModalKey>,
    ModalSelectorState<ModalKey>
> {
    state = {} as ModalSelectorState<ModalKey>;
    manager = new ModalManager<ModalKey>(this);
    closeCurrent = () => this.manager.close();

    render() {
        const {Provider, modals} = this.props;
        const {currentKey, currentPayload, currentContents} = this.state;
        const CurrentModal = currentKey && modals[currentKey] as ModalTemplate;

        return <Provider value={this.manager}>
            {this.props.children}
            <ModalRenderer
                template={CurrentModal}
                modalKey={currentKey}
                payload={currentPayload}
                contents={currentContents}
                close={this.closeCurrent}
            />
        </Provider>;
    }
}
export default ModalSelector;
