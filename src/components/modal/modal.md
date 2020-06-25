# Modals
This module serves as a bridge to allow web and native builds to have different approaches to showing modals.
For web builds, we want to use a popup component.
For native builds, we want to use a full-screen navigation stack.

## createModals(modals: ModalComponentMap)
This function creates the components to be used.  
It's passed an object containing the components to be used as templates for the modals.   
The returned object contains the `Container`, `Modal` and `Watcher`.

### ModalTemplate
The template is passed these properties:
* `modalKey` - The key of the instance using this template.
* `payload` - Instance data passed to the template.
* `close` - A function that will close the instance.

### Example
```tsx
import React from "react";
import {Text, View, Button} from "react-native";
import createModals, {ModalProps} from "../../components/modal/createModals";

// FooModel shows the children and anything else passed.
function TestModel({children, ...others}: ModalProps) {
     return <View style={{ borderWidth: 2, borderColor: 'red' }}>
         <Text>TestModel</Text>
         <Text>{JSON.stringify(others)}</Text>
         {children}
     </View>;
 }
 // Bar Model shows the payload text.
interface MessagePayload { text: string }
function MessageModal(props: ModalProps<MessagePayload>) {
     return <View style={{ borderWidth: 2, borderColor: 'orange' }}>
        <Text>MessageModal</Text>
        <Text>{props.payload?.text}</Text>
        <Button title="OK" onPress={props.close} />
     </View>;
 }

 const Modals = createModals({
     test: TestModel,
     message: MessageModal,
 });
```

## Group
A Group holds the state of which modal is currently open. Each Group has its own state and there can be multiple.  
It is also the place where the modals get rendered when they open.  
All other Modal components must be in a Group, but a Group can contain other elements too.

## Instance
The modal Instance controls which modal is open. There can only be one modal open per Group.  

### Properties
* `modalKey` (Required) - A key in the object passed to `createModals()`, specifying which template to use.
* `show` (Required) - Defines whether the modal is open or note. 
* `payload` - Data passed to the template for it to use.
* `onOpen` - A callback for when the modal is opened.
* `onClose` - A callback for when the modal is closed. Good for updating any state used in `show`.
The children are also passed through to the modal template.

### Example
```tsx
<Modals.Group>
    <Text>Modals Example</Text>
    <Button 
        title={`${this.state.showTest ? 'Hide' : 'Show'} Test`} 
        onPress={() => this.setState({ showTest: this.state.showTest })} 
    />
    <Button 
        title={`${this.state.showTest ? 'Hide' : 'Show'} Message`} 
        onPress={() => this.setState({ showMessage: this.state.showTest })}
    />
    <Modals.Instance
        modelKey='test'
        show={this.state.showTest}
        onClose={() => this.setState({ showTest: false })}
    >
        <Text>Child Of ModelFoo</Text>
    </Modals.Instance>
    <Modals.Instance<MessagePayload>
        modelKey='message'
        show={this.state.showMessage}
        onClose={() => this.setState({ showMessage: false })}
        payload={{ text: 'Hello' }}
    />
</Modals.Group>
```

## Status
Utility component which exposes the status, for whatever reason.

### Example
```tsx
<Modals.Group>
    {/* Other components */}
    <Modals.Status>{
        ({modalKey, payload, contents}) => <View style={{ borderWidth: 2 }}>
            <Text>TempModals.Watcher: {modalKey || 'none'} {JSON.stringify(payload)}</Text>
            <View style={{ borderWidth: 1, margin: 1, padding: 1 }}>{contents}</View>
        </View>
    }</Modals.Status>
</Modals.Group>
```
