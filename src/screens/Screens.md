# Screens

## Adding new Screens
1. Create screen component.
2. Create new entry in `src/screens/AppRoutes.ts`. Value is used in the URL.
3. Add to `src/screens/AppNavigation.tsx:render()` using `AppNavigation.createScreen()`.
4. Add to `src/screens/AppRouteTree.ts`. Value is `null` or the next tree, depending on if it's the last branch.
