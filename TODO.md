# Typescript 4
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html
  * @typescript-eslint/eslint-plugin
  * @typescript-eslint/parser
  * IDE
  * Any other dependencies?

# Server API (+ Client)
* Search (i.e. DeckApi.getDecksByUserId).
* Add Card content sizes.

# Media API
Media API to access S3 from, rather than direct from client, which exposes the bucket.  
An API also allows us to do some validation, such as file size/type checks.
Decks would only need a `file-key`, rather than an `S3Object`, since the bucket's details can be made available from config.

`POST /api/media/`
* Receives uploaded file data.
* Perform validation checks (authentication, file size/type).
* Generate new `file-key`.
* Place in S3 bucket determined by config.
* Respond with `file-key`. 

`GET /api/media/[deck-id]/[file-key]/` 
* Perform validation checks (authenticated + authorised to view deck, file belongs to deck).
* Respond with file in S3 bucket determined by config.

**Responses:**
* Upload - 201: Success - Return `file-key`.
* Upload - 400: Validation error - Return error message.
* Upload - 401: Not logged in.
* Upload - 500: S3 Error.
* Download - 200: Success - Return file data.
* Download - 404: File not in the deck, or deck doesn't exist (or not passed).
* Download - 410: File not in the bucket.
* Download - 401: Not logged in.
* Download - 403: Not able to view deck.
* Download - 500: S3 Error.

# Client
* Deck Tag editing.
* Fix sign-in warnings.
  * Error message logging in with preceding space

# Testing
* Update unit tests.
