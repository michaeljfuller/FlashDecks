# FlashDecks

# Development
## DotEnv
Files containing constants that can differ between build types.
The environment files are processed by [react-native-dotenv](https://github.com/zetachang/react-native-dotenv) 
by adding it as a module to `babel.config.js`, and can be accessed through `src/env.ts`.  
* `.env`  
The default file used for running the app. Not added to version control so incremental changes can be made during development.
* `.env.development`
The file used for development builds and running tests. Can be used as a template for making a `.env` on a fresh Git clone.
* `.env.production`
The file used for production builds of the app.
