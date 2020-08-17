import React from "react";
import {PortalNetworkManager} from "./PortalNetworkManager";

export const PortalNetworkContext = React.createContext<PortalNetworkManager>(null as any); // Null as any because a value is always set by PortalNetwork.
