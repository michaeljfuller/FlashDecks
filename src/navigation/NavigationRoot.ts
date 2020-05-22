// @ts-ignore
import { createBrowserApp } from '@react-navigation/web';
import { AppContainer } from '../screens/AppContainer';

/** Make AppContainer the root of Navigation. */
export const NavigationRoot = createBrowserApp(AppContainer);
export default NavigationRoot;
