import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import {DeckRoutes, DeckRoutesTree} from "./DeckRouteTree";
import DeckListScreen from "./DeckList/DeckListScreen";
import DeckViewScreen from "./DeckView/DeckViewScreen";
import DeckEditScreen from "./DeckEdit/DeckEditScreen";
const {Navigator, Screen} = createStackNavigator();

export function DeckRouteContainer() {
    return <Navigator headerMode="none" initialRouteName={DeckRoutesTree.base}>
        <Screen name={DeckRoutes.List} component={DeckListScreen} />
        <Screen name={DeckRoutes.View} component={DeckViewScreen} />
        <Screen name={DeckRoutes.Edit} component={DeckEditScreen} />
        <Screen name={DeckRoutes.New} component={DeckEditScreen} />
    </Navigator>;
}
export default DeckRouteContainer;
