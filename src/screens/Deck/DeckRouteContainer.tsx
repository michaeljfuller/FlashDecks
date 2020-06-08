import React from "react";
import {setNavigator} from "../../navigation/navigators/setNavigator";
import {StandardNavigator} from "../../navigation/navigators/StandardNavigator/StandardNavigator";
import DeckRouteNavigator from "./DeckRouteContainer_navigator";

@setNavigator(DeckRouteNavigator)
export default class DeckRouteContainer extends StandardNavigator {
}
