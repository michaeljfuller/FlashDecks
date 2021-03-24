# Typescript 4
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html
  * @typescript-eslint/eslint-plugin
  * @typescript-eslint/parser
  * IDE
  * Any other dependencies?

# Server API (+ Client)
* Deck search
* Add Card content sizes.

# Media API
Media API to access S3 from, rather than direct from client, which exposes the bucket.  
An API also allows us to do some validation, such as file size/type checks.
Using this as a proxy would stop 403 error occurring when watching a video so long the temp S3 credentials expire (15mins).
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
* Continue as guest - Needs updating permissions on API to allow unauthenticated.
* User management screen
  * Set display name.
  * Set avatar.

# Testing
* Update unit tests.
* Use native tests too.
  * Use `@testing-library/react-native` rather than `@testing-library/react`.

# Deployment
* https://create-react-app.dev/docs/deployment/
* [Deploying a create-react-app with routing to GitHub pages](https://medium.com/@bennirus/deploying-a-create-react-app-with-routing-to-github-pages-f386b6ce84c2)
* https://docs.expo.io/workflow/publishing/
* https://docs.expo.io/distribution/building-standalone-apps/