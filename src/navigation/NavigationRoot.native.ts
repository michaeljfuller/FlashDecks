import { createAppContainer } from "react-navigation";
import { AppContainer } from '../screens/AppContainer';

/** Make AppContainer the root of Navigation. */
export const NavigationRoot = createAppContainer(AppContainer);
export default NavigationRoot;
