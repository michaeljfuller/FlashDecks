import {NavigationRouterDetails} from "../../navigation/navigation_types";

export interface AppBannerProps {
    routerDetails: NavigationRouterDetails;
    loggedInUser?: User|null;
    onToggleSidebar: () => void;
    onSignOutClick: () => void;
}
