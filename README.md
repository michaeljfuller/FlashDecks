# FlashDecks
An app for the creation of flash cards.

# Server Frameworks & Libraries
## [AWS Amplify](https://aws.amazon.com/amplify/)
This is used to simplify the hosting the API and web app on Amazon's serverless cloud platform.

# Client Frameworks & Libraries
## [React Native](https://reactnative.dev/)
This is used to create the client for both browser and mobile app.
## [Expo](https://expo.io/)
A tool to help with the creation, building & running of React Native apps.
## [React Redux](https://react-redux.js.org/)
[Redux](https://redux.js.org/) integration for React, including the [Store](https://redux.js.org/api/store), to help manage the app's state.
## [Material-UI](https://material-ui.com/)
This is a React Component Library used for browser builds of the client.
## [NativeBase](https://nativebase.io/)
This is a React Component Library used for mobile app builds of the client.

# Testing Frameworks & Libraries
## [Jest](https://jestjs.io/)
The default testing tool for React.
## [Enzyme](https://enzymejs.github.io/enzyme/)
A tool to help with testing React components.

# Development Notes
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
