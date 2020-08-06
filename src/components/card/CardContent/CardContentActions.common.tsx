export interface CardContentActionsProps {
    resizing: boolean;
    onPressDone: () => void;
    onPressEdit: () => void;
    onPressAddBefore: () => void;
    onPressAddAfter: () => void;
    onPressResize: () => void;
    onPressDelete: () => void;
}
