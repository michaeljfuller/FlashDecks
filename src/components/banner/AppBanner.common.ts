import {NavigationRouterDetails} from "../../navigation/navigation_types";

export interface AppBannerProps {
    routerDetails: NavigationRouterDetails;
    onToggleSidebar: () => void;
    onSignOutClick: () => void;
}
