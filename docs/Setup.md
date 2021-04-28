# Setting Up

## Installing
As with most JS apps, run `npm install` to pull dependencies.  
You'll also want to `npm install --global` [@aws-amplify/cli](https://docs.amplify.aws/start/getting-started/installation/q/integration/react) and [expo-cli](https://docs.expo.io/).  
Once **@aws-amplify/cli** is installed, you'll need to run `amplify configure` to [sign in](https://docs.amplify.aws/start/getting-started/installation/q/integration/react#install-and-configure-the-amplify-cli). 

## Checkout Backend Environment
To start, you'll need to install and set up the [Amplify CLI](https://docs.amplify.aws/cli/start/install).  
To checkout a backend branch, use `amplify pull --appId dxccldee9zefn --envName dev` to checkout the dev branch.  
You'll need access to the app to do this, else you'll need to create your own app with `amplify init`. 
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
