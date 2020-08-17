import {NavigationRouterDetails} from "../../navigation/navigation_types";
import {UserModel} from "../../models";

export interface AppBannerProps {
    routerDetails: NavigationRouterDetails;
    loggedInUser?: UserModel|null;
    onToggleSidebar: () => void;
    onSignOutClick: () => void;
}
