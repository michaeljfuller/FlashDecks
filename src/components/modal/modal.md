# Modals
This module serves as a bridge to allow web and native builds to have different approaches to showing modals.
For web builds, we want to use a popup component.
For native builds, we want to use a react-navigation screen.

## <Modal>
The abstract class for implemented Modals.    
It has a required `open` property to determine if the modal should be shown.  
It has optional `onOpen` and `onClose` properties to ensure the variable used in `open` always gets updated.  

### Web Implementation
For web builds, this simply wraps a Material-UI Modal.

### Native Implementation
For native builds, it uses a react-navigation screen. This approach was chosen because a react-native Modal has some display issues while used in nested navigators.  
The Modal's contents are passed into a **PortalEntrance**, which then get displayed in the **PortalExit** in a **ModalsScreen**.  
When the `open` property is changed, `navigateToModal`/`navigateFromModal` trigger a navigation action on the `RootNavigation` component, which will either show the `ModalsScreen` or the standard `ScreenNavigation` component (where normal pages are displayed).

## Implementing New Modals
To create a new modal type, it should wrap the base `Modal` component, passing it the required `ModalProps`.

### Example
```tsx
export type MyModalProps = {
    title: string;
} & ModalProps;

export class MyModal extends React.PureComponent<PromptModalProps> {
    render() {
        return <Modal {...extractModalProps(this.props)}>
            <ModalHeader title={this.props.title} />
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <Button title="Close" onClick={this.props.onClose} />
            </ModalFooter>
        </Modal>;
    }
}
```

## Implemented Modals
### AlertModal
The standard modal to display a message and close button.
Has optional text and title properties, and will render any children.

#### Example 
```tsx
<Button title="Load" onClick={() => this.setState({showMessage: true})} />
<AlertModal 
    title="Hello World" 
    message="This is a message." 
    open={this.state.showMessage} 
    onClose={() => this.setState({showMessage: false})} 
/>
```

### DebugModal
Like the AlertModal, but can be passed a `data` object to be displayed as JSON.

#### Example 
```tsx
<Button title="Load" onClick={this.load} />
<DebugModal 
    title="Response Data" 
    data={this.state.response} 
    open={this.state.showResponse} 
    onClose={() => this.setState({showResponse: false})} 
/>
```
