import React, {ConsumerProps, PropsWithChildren, Provider} from 'react';
import ModalSelector from './core/ModalSelector';
import ModalManager from "./core/ModalManager";
import ModelDispatcher from "./core/ModalDispatcher";

export type ModalContents = React.ReactNode;

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
 *  <Modals.Container>
 *      {...}
 *      <Modals.Watcher>{({modalKey}) => <Text>The current modal is: {modalKey || 'none'}</Text>}</Modals.Watcher>
 *      <Modals.Model modelKey='Foo' show={this.state.showModalFoo}>
 *          <Text>Text to show inside of ModalFoo as a child.</Text>
 *      </Modals.Model>
 *      <Modals.Model modelKey='Bar' show={this.state.showModalBar} payload={{
 *          text: 'Text to show inside of ModalBar as a property.'
 *      }} />
 *  </Modals.Container>
 */
export function createModals(modals: ModalComponentMap) {
    // Create current types
    type ModalKey = keyof (typeof modals); // Keys of the passed modals.
    type ThisModalManager = ModalManager<ModalKey>;

    // Create the context
    const Context = React.createContext<ThisModalManager>(null as any); // Provider always sets a Dispatcher.
    Context.displayName = `createModels(${Object.keys(modals).join('|')})`;

    // The ModalContainer holds the Context Provider with the Dispatcher, and renders the modals.
    function Container(props: PropsWithChildren<{}>) {
        return <ModalSelector<ModalKey>
            Provider={Context.Provider as Provider<ThisModalManager>}
            modals={modals}
        >{props.children}</ModalSelector>;
    }

    // The ModelState passes the state info to have dispatcher to have it rendered.
    function Modal<Payload=any>(props: PropsWithChildren<{
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

    // The Watcher lets you see the current state of the modals.
    interface WatcherState {
        modalKey?: ModalKey|undefined;
        payload?: any;
        contents?: ModalContents;
    }
    type WatcherProps = ConsumerProps<WatcherState>;
    class Watcher extends React.Component<WatcherProps, WatcherState> {
        state: WatcherState = {};

        // Bind ModalManager
        static contextType = Context;
        get manager(): ThisModalManager {
            return this.context;
        }

        // Subscribe to manager
        componentDidMount() {
            this.manager.onChange.subscribe({
                next: state => this.setState({
                    modalKey: state.currentKey,
                    payload: state.currentPayload,
                    contents: state.currentContents,
                }),
            });
        }

        // Pass through state to child
        render() {
            return this.props.children(this.state);
        }
    }

    return {
        Container,
        Modal,
        Watcher,
    };
}
export default createModals;
