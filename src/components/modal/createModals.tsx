import React, {PropsWithChildren, Provider} from 'react';
import ModalSelector from './core/ModalSelector';
import ModalManager from "./core/ModalManager";
import ModelDispatcher from "./core/ModalDispatcher";

export type ModelContents = React.ReactNode;

export type ModalProps<Payload = any> = PropsWithChildren<{
    modalKey?: string|number;
    payload?: Payload;
}>;
export type ModalComponent = React.ComponentType<ModalProps>;

/** Input to createModals, mapping components to keys. */
export interface ModalComponentMap {
    [key: string]: ModalComponent;
    [num: number]: ModalComponent;
}

/**
 * Create a context to display modals with.
 * Web implementation uses a Material-UI Modal, while Mobile will use a React-Navigation Stack.
 * @example
 *  const Modals = createModals({
 *      // FooModel shows the children and anything else passed.
 *      Foo: function FooModel({children, ...others}: ModalProps) {
 *          return <View style={{ borderWidth: 2, borderColor: 'red' }}>
 *              <Text style={{ color: 'red' }}>FooModel - {JSON.stringify(others)}</Text>
 *              {children}
 *          </View>;
 *      },
 *      // Bar Model shows the payload text.
 *      Bar: function BarModel(props: ModalProps<{ text: string }>) {
 *          return <View style={{ borderWidth: 2, borderColor: 'orange' }}>
 *              <Text style={{ color: 'orange' }}>BarModel - {props.payload?.text}</Text>
 *          </View>;
 *      },
 *  });
 *  -------
 *  <Modals.ModalContainer>
 *      {...}
 *      <TempModal.ModelState modelKey='Foo' show={this.state.showModalFoo}>
 *          <Text>Text to show inside of ModalFoo as a child.</Text>
 *      </TempModal.ModelState>
 *      <TempModal.ModelState modelKey='Bar' show={this.state.showModalBar} payload={{
 *          text: 'Text to show inside of ModalBar as a property.'
 *      }} />
 *  </Modals.ModalContainer>
 */
export function createModals(modals: ModalComponentMap) {
    // Create current types
    type ModalKey = keyof (typeof modals); // Keys of the passed modals.
    type Manager = ModalManager<ModalKey>;

    // Create the context
    const Context = React.createContext<Manager>(null as any); // Provider always sets a Dispatcher.
    Context.displayName = `createModels(${Object.keys(modals).join('|')})`;

    // The ModalContainer holds the Context Provider with the Dispatcher, and renders the modals.
    function ModalContainer(props: PropsWithChildren<{}>) {
        return <ModalSelector<ModalKey>
            Provider={Context.Provider as Provider<Manager>}
            modals={modals}
        >{props.children}</ModalSelector>;
    }

    // The ModelState passes the state info to have dispatcher to have it rendered.
    function ModelState<Payload=any>(props: PropsWithChildren<{
        modelKey: ModalKey;
        show: boolean;
        payload?: Payload;
        // onClose?: () => void; // TODO Close when other modal opened. Listen/Observe dispatcher?
    }>) {
        return <Context.Consumer>{
            manager => <ModelDispatcher<ModalKey>
                manager={manager}
                modelKey={props.modelKey}
                show={props.show}
                payload={props.payload}
                contents={props.children}
            />
        }</Context.Consumer>;
    }

    return {
        ModalContainer,
        ModelState,
        // TODO ModelState consumer wrapper to get which model is open.
    };
}
export default createModals;
