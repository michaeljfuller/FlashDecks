# Portals
Portals have the job of taking the content of a ***PortalEntrance*** and rendering it inside of a ***PortalExit***.

## Components
### PortalNetwork
A required top-level React Context Component which holds the ***PortalNetworkManager*** to link Portal entrances and exits.

### PortalNetworkManager
A manager that links ***PortalEntrance***s to a ***PortalExit*** by a common ***portalId*** in the ***PortalNetwork***.

### PortalEntrance
A component whose contents will get sent to the ***PortalExit*** that has the same ***portalId*** ***PortalNetwork***.

### PortalExit
A component which renders the contents of ***PortalEntrance***s with the same ***portalId*** ***PortalNetwork***.

### PortalWatcher
A utility class which sends ***PortalNetworkManager*** data to the child function.

## Example
```tsx
<PortalNetwork>
    <View>
        <PortalEntrance portalId="example">
            <Text>Hello World</Text>
        </PortalEntrance>
    </View>
    <View>
        <PortalWatcher>{
            (data) => <Text>There are {data.entrances.length} entrance(s).</Text>
        }</PortalWatcher>
        <PortalExit portalId="example" />
    </View>
</PortalNetwork>
```
