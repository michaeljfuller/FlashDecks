export interface ApiList<ListElement> {
    nextToken?: string|null;
    items?: ListElement[];
}
