# src/navigation/AppNavigation
These files set up and define the top-level navigation of the app.

## AppNavigation.tsx
Sets up the **NavigationContainer**, which contains the **RootNavigation** and **ScreenNavigation**.

## appNavigationRef.ts
Contains the React Reference to the **NavigationContainer**, which exposes navigation actions outside of being passed as a property to Screens.  
This file also contains facades for some actions.

## RootNavigation.tsx
Provides an extra level of navigation for Native builds to add a screen for Modals, following the [React-Navigation docs](https://reactnavigation.org/docs/modal/).  
For Web builds, this isn't needed, so it just goes to **ScreenNavigation**.

## ScreenNavigation.tsx
Handles the top-level navigation of screens listed in **appRouteScreens**, that will appear in the drawer/sidebar.

## External Files
Files imported from outside this directory.

### src/screens/AppRoutes.ts
Contains the named routes for the top-level Screens.

### src/screens/AppRouteTree.ts
The base of the Navigation tree that defines the site-map, to be used in breadcrumbs.

### appRouteScreens.ts
Contains the route names and components of the top-level Screens to be added to **ScreenNavigation**.
