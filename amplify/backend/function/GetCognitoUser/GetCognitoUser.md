# Get Cognito User
Returns a User from the App's Cognito User Pool.

## Examples
### From Entity
Query
```graphql
query MyQuery {
  getThing(id: "thing-id") {
    owner {
      userName
      id
      displayName
    }
    ownerId
  }
}
```

Event
```json
{
    "typeName": "Deck",
    "fieldName": "owner",
    "arguments": {},
    "identity": { "sub": "logged-in-user-sub" },
    "source": { "ownerId": "d8709f13-3b1d-4c94-8c9f-e5fb20f2ba78" }
}
```
### By ID
Query
```graphql
query MyQuery {
  getUser(id: "user-id") {
    id
    userName
    displayName
  }
}
```

Event
```json
{
    "type": "Query",
    "field": "getUser",
    "arguments": { "id": "d8709f13-3b1d-4c94-8c9f-e5fb20f2ba78" },
    "identity": { "sub": "logged-in-user-sub" }
}
```
### By Logged in User
Query
```graphql
query MyQuery {
  getUser {
    id
    userName
    displayName
  }
}

```

Event
```json
{
    "type": "Query",
    "field": "getUser",
    "arguments": {},
    "identity": { "sub": "d8709f13-3b1d-4c94-8c9f-e5fb20f2ba78" }
}
```
