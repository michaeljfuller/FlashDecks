import * as appTree from './screens/AppRouteTree';
import {hasProperty} from "./utils/object";

export default appTree;
export { appTree };

interface IRouteTree {
    base: string;
    children: {
        [routeKey: string]: IRouteTree | null;
    };
}

/** Get the leaf route from a branch route. */
export function getBaseRouteFromName(routeKey: string, tree: IRouteTree = appTree.AppRoutesTree): string {
    // Found route, now find base.
    if (hasProperty(tree.children, routeKey)) {
        const childTree = tree.children[routeKey];
        if (childTree) return getBaseRoute(childTree);
        return routeKey;
    }
    // Traverse the tree for the target routeKey.
    for (const key in tree.children) {
        const childTree = tree.children[key];
        if (childTree) {
            const result = getBaseRouteFromName(routeKey, childTree);
            if (result) return result;
        }
    }
    return '';
}

/** Follow the base routes up the tree and return the leaf route key */
function getBaseRoute(tree: IRouteTree): string {
    const childTree = tree.children[tree.base]; // Get the child tree.
    if (childTree) return getBaseRoute(childTree); // If there is a child tree, call recursively.
    return tree.base; // If there is no child tree, we found it.
}
