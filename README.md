# FlashDecks
This is a medium size project used to practice, explore and showcase using [React Native](https://reactnative.dev/) 
and [AWS Amplify](https://aws.amazon.com/amplify/).

## Hosting
* **Web Version**  
[https://dev.dxccldee9zefn.amplifyapp.com](https://dev.dxccldee9zefn.amplifyapp.com) 
* **Mobile App Version (via Expo App)**  
[https://expo.io/@michaelfuller/projects/FlashDecks](https://expo.io/@michaelfuller/projects/FlashDecks)

## About the app
FlashDecks is a web/mobile app that lets users create and share collections of "Flash Cards".

Flash Cards are a study tool where a question is on one side, and answers are on the reverse.  
Since these cards are digital they can contain media which physical cards don't, such as video and links.  

It is not available on iOS, as I don't have an iOS device to test it on.

# Development

## Installing
As with most JS client apps, run `npm install` to pull dependencies.  
You'll also want to `npm install --global` [@aws-amplify/cli](https://docs.amplify.aws/start/getting-started/installation/q/integration/react) and [expo-cli](https://docs.expo.io/).  
Once **@aws-amplify/cli** is installed, you'll need to run `amplify configure` to sign in. 

### Checkout Backend Environment
To start, you'll need to install and set up the [Amplify CLI](https://docs.amplify.aws/cli/start/install).  
To checkout a backend branch, use `amplify pull --appId dxccldee9zefn --envName dev` to checkout the dev branch.  
You'll need access to the app to do this, else you'll need to create a new app with `amplify init`, or potentially create it in the [Amplify Console](https://console.aws.amazon.com/amplify/) and run `amplify pull`. 
If the compiled app complains that it cannot resolve `aws-exports`, it's because this has not been done.
  
When asked some questions, you can select the defaults.
```
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: default
? Choose your default editor: None
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using: react-native
? Source Directory Path: /
? Distribution Directory Path: /
? Build Command: npm.cmd run-script build
? Start Command: npm.cmd run-script start
```

## Client Architecture
I'm using [React Native](https://reactnative.dev/) & [Expo](https://expo.io/) to build both a web and native mobile app using with one codebase.
  
### Code Separation
Some components may need to be different between web and native builds, due to different layout or behavior requirements.  

React Native allows us to split builds by adding platform suffixes to file extensions.  
For example; if we have `Component.tsx` & `Component.native.tsx`, then the `.native` file replaces the original in native builds.    

When a component needs to be split between platforms, I take one of two approaches
#### Functional components
I create a `Component.common.ts` file that is imported in both web and native versions of the component.  
It defines the component properties, so they're consistent between both versions. It's important the component signature doesn't change.
#### Class components
Like the functional components, I define the properties in a `Component.common.ts` file.  
I may also specify an abstract base class they both use, so they can share functionality.
However, I tend to leave defining the State to the different implementations, as state is tied to the View.

### Environment Variables
Environment variables are injected into `app.config.js`'s [extra](https://docs.expo.io/guides/environment-variables/#using-app-manifest--extra) property when Expo runs.  
If a value is not found, I make it fall back onto a `.env` file, which is helpful for local development.  
The environment variables are set on the [Amplify server](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html).

## Server Architecture
For the back-end, I'm using [Amazon Web Services](https://aws.amazon.com/). Because this is a relatively simple app, I'm using [Amplify](https://aws.amazon.com/amplify/) to streamline the process.  
### Services
* **[Auth](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js)**  
Uses [AWS Cognito](https://aws.amazon.com/cognito/) for user authentication.
* **[API (GraphQL)](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js)**  
The [GraphQL](https://graphql.org/) API to request & submit app data. It uses [AWS DynamoDB](https://aws.amazon.com/dynamodb/) as the data store, but because we're using Amplify, that's behind the scenes.
* **[Functions](https://docs.amplify.aws/cli/function)**  
For a custom GraphQl resolver function using [AWS Lambda](https://aws.amazon.com/lambda/) that lets me connect to Cognito to pull the requested user.
* **[Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js)**  
An [AWS S3](https://aws.amazon.com/s3/) bucket is used to store the media users upload for their cards.

## Client Testing
The app can do Unit, Coverage and Lint tests.  
I started by working in a TDD workflow, but dropped it as it didn't suit the exploratory nature of the project.
Now testing is done when I'm happy further changes are unlikely.  

I created a custom [ExpressJS](https://expressjs.com/) service which hosts a webpage that watches and outputs 
the result of the Unit, Coverage and Lint tests - along with a button to run them.  
The service can be run using `npm run test:reports` & tests can be run using `npm test`.

I started using [Enzyme](https://enzymejs.github.io/enzyme/) in the tests, as it's the most popular test helper, 
but then adopted [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) 
as its recommended in the official React documentation, and seems to be the direction the community's going.  

## Client Frameworks & Libraries
* **[React Native](https://reactnative.dev/)**  
This is used to create the client for both browser and mobile app.
* **[Expo](https://expo.io/)**  
A tool to help with the creation, building & running of React Native apps.
* **[Amplify](https://aws.amazon.com/amplify/)**  
A client library to help with using Amazon Web Services.
* **[React Redux](https://react-redux.js.org/)**  
[Redux](https://redux.js.org/) integration for React, including the [Store](https://redux.js.org/api/store), to help manage the app's state.
* **[Material-UI](https://material-ui.com/)**  
This is a React Component Library used for browser builds of the client.
* **[NativeBase](https://nativebase.io/)**  
This is a React Component Library used for mobile app builds of the client.
* **[Immer](https://immerjs.github.io/immer/)**  
This is used to facilitate immutability.  
It's build into our **ImmutableComponent** and **ImmutablePureComponent** classes, and the Redux reducers.
The [use-immer](https://github.com/immerjs/use-immer) hook has also been added.

## Testing Frameworks & Libraries
* **[Jest](https://jestjs.io/)**  
The default testing tool for React.
* **[Enzyme](https://enzymejs.github.io/enzyme/)**  
A tool to help with testing React components.
* **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**  
A tool to help with testing React components.

# Future Development Possibilities
* Convert to [Next.js](https://nextjs.org/) app.
* Create Media API  
To access S3 from, rather than direct from client, which exposes the bucket.  
An API also allows us to do some validation, such as file size/type checks.  
Using this as a proxy would stop 403 error occurring when watching a video so long the temp S3 credentials expire (15mins).
