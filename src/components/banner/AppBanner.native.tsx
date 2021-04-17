import React from "react";
import {StyleSheet} from 'react-native';
import {Body, Header, Left, Right} from 'native-base';
import {IconButton, IconType} from "../button/IconButton";
import {AppBannerProps} from "./AppBanner.common";
import {Color} from "../../styles/Color";
import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import Avatar from "../avatar/Avatar";
import {UserModel} from "../../models";
import Row from "../layout/Row";
import {AppBannerStoreProps, reduxConnector} from "./AppBanner_redux";

export {AppBannerProps} from "./AppBanner.common";

// const color = Color.White;
const backgroundColor = Color.Blue;

export const TestIDs = {
    Root: "AppBanner-Root",
    SidebarButton: "AppBanner-SidebarButton",
    Breadcrumbs: "AppBanner-Breadcrumbs",
    SignOut: "AppBanner-SignOut",
}

export const AppBanner: React.FunctionComponent<AppBannerProps> = React.memo(reduxConnector(function AppBanner(
    props: AppBannerProps & AppBannerStoreProps
) {
    const {
        loggedInUser, onToggleSidebar, onSignOutClick, routerDetails
    } = props;

    return <Header testID={TestIDs.Root} androidStatusBarColor={backgroundColor} style={styles.header}>
        <Left style={styles.left}>
            <IconButton testID={TestIDs.SidebarButton}
                icon={IconType.Menu} onClick={onToggleSidebar} transparent size={32} square color="White"
            />
        </Left>
        <AppBreadcrumbs testID={TestIDs.Breadcrumbs} routerDetails={routerDetails} />
        <Right>
            <AppBannerUserDisplay user={loggedInUser} onSignOutClick={onSignOutClick} />
        </Right>
    </Header>;
}));
export default AppBanner;

interface AppBannerUserDisplayProps {
    user: UserModel|null|undefined;
    onSignOutClick: () => void;
}
function AppBannerUserDisplay(props: AppBannerUserDisplayProps) {
    const {user, onSignOutClick} = props;
    const avatar = <Avatar
        user={user}
        size={24}
        label={user ? user.displayName : 'guest'}
        labelPlacement="right"
    />;
    return <Row>
        <Body style={styles.body}>{avatar}</Body>
        <IconButton testID={TestIDs.SignOut}
            icon={IconType.Exit} onClick={onSignOutClick} transparent width={50} height={32} color="White"
        />
    </Row>;
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 15,
        height: 35,
        backgroundColor,
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: 40,
        paddingRight: 15,
    },
    body: {
        // flexDirection: 'row',
    }
});
