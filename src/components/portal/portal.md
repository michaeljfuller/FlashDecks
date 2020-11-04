# Portals
Portals have the job of taking the content of a ***PortalEntrance*** and rendering it inside of a ***PortalExit***.  
It does this by PortalEntrances sending a callback to the Redux Store which will recreate the contents of the ***PortalEntrance***.

## Components
### PortalEntrance
A component whose contents will get sent to a ***PortalExit*** with the same ***portalId***.  
If a `style` property is passed, it is assigned to the View that wraps the contents.

### PortalExit
A component which renders the contents of ***PortalEntrance***s with the same ***portalId***.  
It is a View, so it can be passed things like the `style` property.  
The children of the PortalExit are rendered if there is no linked PortalEntrance.

## Example
```tsx
<View name="EntranceParent">
    <PortalEntrance portalId="example">
        <Text>Hello World</Text>
    </PortalEntrance>
</View>
<View name="ExitParent">
    <PortalExit portalId="example">
        <Text>No linked PortalEntrance</Text>
    </PortalExit>
</View>
```
Result:
```html
<div name="EntranceParent">
    <!-- PortalEntrance not rendered -->
</div>
<div name="ExitParent">
    <div> <!-- PortalExit -->
        <div> <!-- PortalEntrance -->
            <div>Hello World</div> <!-- Contents -->
        </div>
    </div>
</div>
```
