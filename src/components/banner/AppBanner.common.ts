import {NavigationScreenProps} from "../../navigation/navigation_types";

export interface AppBannerProps extends NavigationScreenProps {
    loggedInUser?: User|null;
    onToggleSidebar: () => void;
    onSignOutClick: () => void;
}
