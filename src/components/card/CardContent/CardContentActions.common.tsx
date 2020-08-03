export interface CardContentActionsProps {
    editing: boolean;
    resizing: boolean;
    onPressDone: () => void;
    onPressEdit: () => void;
    onPressAddBefore: () => void;
    onPressAddAfter: () => void;
    onPressResize: () => void;
    onPressDelete: () => void;
}
