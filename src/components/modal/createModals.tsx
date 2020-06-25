import React, {ConsumerProps, PropsWithChildren, Provider} from 'react';
import ModalSelector from './core/ModalSelector';
import ModalManager, {ModalManagerStatus} from "./core/ModalManager";
import ModelDispatcher from "./core/ModalDispatcher";

export type ModalContents = React.ReactNode;

export type ModalProps<Payload = any> = PropsWithChildren<{
    /** The key used to open this template. */
    modalKey: string|number;
    /** The data passed to this template. */
    payload: Payload;
    /** A function to those this instance. */
    close: () => void;
}>;
export type ModalTemplate = React.ComponentType<ModalProps>;

/** Input to createModals, mapping components to keys. */
export interface ModalTemplateMap {
    [key: string]: ModalTemplate;
    [num: number]: ModalTemplate;
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
 *              <Button onClick={props.close} title="Close" />
 *          </View>;
 *      },
 *  });
 *  -------
 *  <Modals.Group>
 *      <Text>Modals Example</Text>
 *      <Modals.Watcher>{
 *          ({modalKey}) => <Text>The current modal is: {modalKey || 'none'}</Text>
 *      }</Modals.Watcher>
 *      <Modals.Instance modelKey='Foo' show={this.state.showModalFoo} onClose={() => this.setState({ showModalFoo: false })}>
 *          <Text>Text to show inside of ModalFoo as a child.</Text>
 *      </Modals.Instance>
 *      <Modals.Instance
 *          modelKey='Bar'
 *          show={this.state.showModalBar}
 *          onClose={() => this.setState({ showModalBar: false })}
 *          payload={{ text: 'Text to show inside of ModalBar as a property.' }}
 *      />
 *  </Modals.Group>
 */
export function createModals(modals: ModalTemplateMap) {
    // Create current types
    type ModalKey = keyof (typeof modals); // Keys of the passed modals.
    type ThisModalManager = ModalManager<ModalKey>;

    // Create the context
    const Context = React.createContext<ThisModalManager>(null as any); // Provider always sets a Dispatcher.
    Context.displayName = `createModels(${Object.keys(modals).join('|')})`;

    // The Group holds the Context Provider managing the state with the Dispatcher, the ModalSelector to render the modals.
    function ModalGroup(props: PropsWithChildren<{}>) {
        return <ModalSelector<ModalKey>
            Provider={Context.Provider as Provider<ThisModalManager>}
            modals={modals}
        >{props.children}</ModalSelector>;
    }

    // The ModelState passes the state info to have dispatcher to have it rendered.
    interface ModalInstanceProps<Payload> {
        modelKey: ModalKey;
        show: boolean;
        payload?: Payload;
        onOpen?: () => void;
        onClose?: () => void;
    }
    class ModalInstance<Payload = any> extends React.Component<
        ModalInstanceProps<Payload>
    > {
        // Bind ModalManager.
        static contextType = Context;
        get manager(): ThisModalManager {
            return this.context;
        }

        // Subscribe to manager.
        componentDidMount() {
            this.manager.onChange.subscribe({
                next: state => {
                    if (state.current.modalKey !== state.previous?.modalKey) {
                        this.onModalChange(state.current, state.previous);
                    }
                },
            });
        }

        // On modal change, call callbacks.
        onModalChange(current: ModalManagerStatus, previous?: ModalManagerStatus) {
            if (this.props.onOpen && current.modalKey === this.props.modelKey) {
                this.props.onOpen();
            }
            if (this.props.onClose && previous?.modalKey === this.props.modelKey) {
                this.props.onClose();
            }
        }

        render() {
            return <ModelDispatcher<ModalKey>
                manager={this.manager}
                modelKey={this.props.modelKey}
                show={this.props.show}
                payload={this.props.payload}
                contents={this.props.children}
            />;
        }
    }

    // The Watcher lets you see the current state of the modals.
    type ModalStatusState = ModalManagerStatus;
    type ModalStatusProps = ConsumerProps<ModalStatusState>;
    class ModalStatus extends React.Component<ModalStatusProps, ModalStatusState> {
        state: ModalStatusState = {};

        // Bind ModalManager
        static contextType = Context;
        get manager(): ThisModalManager {
            return this.context;
        }

        // Subscribe to manager
        componentDidMount() {
            this.manager.onChange.subscribe({
                next: state => this.setState(state.current),
            });
        }

        // Pass through state to child
        render() {
            return this.props.children(this.state);
        }
    }

    return {
        Group: ModalGroup,
        Instance: ModalInstance,
        Status: ModalStatus,
    };
}
export default createModals;
