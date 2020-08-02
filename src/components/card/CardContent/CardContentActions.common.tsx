export interface CardContentActionsProps {
    editing: boolean;
    resizing: boolean;
    onPressDone: () => void;
    onPressEdit: () => void;
    onPressResize: () => void;
    onPressDelete: () => void;
}
