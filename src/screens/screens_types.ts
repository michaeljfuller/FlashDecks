export interface NavigationTree {
    base: string;
    children: Record<string, NavigationTree|null>;
}
