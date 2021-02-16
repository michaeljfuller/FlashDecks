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
import {AppBannerStoreProps} from "./AppBanner_redux";

export {AppBannerProps} from "./AppBanner.common";

// const color = Color.White;
const backgroundColor = Color.Blue;

export const AppBanner = React.memo(function AppBanner(props: AppBannerProps & AppBannerStoreProps) {
    const {
        loggedInUser, onToggleSidebar, onSignOutClick, routerDetails
    } = props;

    return <Header androidStatusBarColor={backgroundColor} style={styles.header}>
        <Left style={styles.left}>
            <IconButton icon={IconType.Menu} onClick={onToggleSidebar} transparent square color="White" />
        </Left>
        <AppBreadcrumbs routerDetails={routerDetails} />
        <Right>
            <AppBannerUserDisplay user={loggedInUser} onSignOutClick={onSignOutClick} />
        </Right>
    </Header>;
});
export default AppBanner;

interface AppBannerUserDisplayProps {
    user: UserModel|null|undefined;
    onSignOutClick: () => void;
}
function AppBannerUserDisplay(props: AppBannerUserDisplayProps) {
    const {user, onSignOutClick} = props;
    const avatar = <Avatar
        user={user}
        size={20}
        label={user ? user.displayName : 'guest'}
        labelPlacement="right"
    />;
    return <Row>
        <Body style={styles.body}>{avatar}</Body>
        <IconButton icon={IconType.Exit} onClick={onSignOutClick} transparent width={50} color="White" />
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
