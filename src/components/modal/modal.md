# Modals
This module serves as a bridge to allow web and native builds to have different approaches to showing modals.
For web builds, we want to use a popup component.
For native builds, we want to use a full-screen navigation stack.

## <ModalRoot>
A ModalRoot is required to host a ModalManager and define where Modals are rendered.    

### ModalManager
The ModalManager is responsible for opening and closing Modals.

### ModalRenderer
The ModalManager determines how the Modals are structured on the page.  
For a Web build, a Material-UI Modal is centered on the screen.
For a Native build, a React-Navigation Stack is used to represent the modal as an overlaying page.

## <Modal>
The abstract class for implemented Modals. Uses the ModalManager of the nearest parent ModalRoot to manage its state.  
It has a required `open` property to determine if the modal should be shown.  
It has optional `onOpen` and `onClose` properties to ensure the variable used in `open` always gets updated.  

Child classes be placed anywhere under a <ModalRoot>.  
Their render function should return null, as their rendering is deferred to another time and place.
Instead, they have a `renderModal()` method which is called by ModalRenderer when appropriate.

### AlertModal
The standard modal to display a message and close button.
Has optional text and title properties, and will render any children.

#### Example 
```tsx
<ModalRoot>
    <View>
        <Button title="Load" onClick={() => this.setState({showMessage: true})} />
        <AlertModal 
            title="Hello World" 
            message="This is a message." 
            open={this.state.showMessage} 
            onClose={() => this.setState({showMessage: false})} 
        />
    </View>
</ModalRoot>
```

### DebugModal
Like the AlertModal, but can be passed a `data` object to be displayed as JSON.

#### Example 
```tsx
<ModalRoot>
    <View>
        <Button title="Load" onClick={this.load} />
        <DebugModal 
            title="Response Data" 
            data={this.state.response} 
            open={this.state.showResponse} 
            onClose={() => this.setState({showResponse: false})} 
        />
    </View>
</ModalRoot>
```
