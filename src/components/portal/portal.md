# Portals
Portals have the job of taking the content of a ***PortalEntrance*** and rendering it inside of a ***PortalExit***.

## Components
### PortalNetwork
A required top-level React Context Component which holds the ***PortalNetworkManager*** to manage state.

### PortalNetworkManager
A manager that links ***PortalEntrance***s to a ***PortalExit*** by a common ***networkId*** in the ***PortalNetwork***.

### PortalEntrance
A component whose contents will get sent to the ***PortalExit*** that has the same ***networkId*** ***PortalNetwork***.

### PortalExit
A component which renders the contents of ***PortalEntrance***s with the same ***networkId*** ***PortalNetwork***.

### PortalWatcher
A utility class which sends ***PortalNetworkManager*** data to the child function.

## Example
```tsx
<PortalNetwork>
    <View>
        <PortalEntrance networkId="example">
            <Text>Hello World</Text>
        </PortalEntrance>
    </View>
    <View>
        <PortalWatcher>{
            (data) => <Text>There are {data.entrances.length} entrance(s).</Text>
        }</PortalWatcher>
        <PortalExit networkId="example" />
    </View>
</PortalNetwork>
```
