import React from 'react';

import Amplify, {Analytics} from 'aws-amplify';
// @ts-ignore
import config from './aws-exports';
Amplify.configure(config);
Analytics.disable(); // Prevent warning about not being configured.

import AppRoot from './src/AppRoot/AppRoot'

export default AppRoot;
