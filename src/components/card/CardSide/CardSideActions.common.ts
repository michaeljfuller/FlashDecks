export interface CardActionsProps {
    editing: boolean;
    disabled?: boolean;
    onPressDone?: () => void;
    onPressCancel: () => void;
    onPressEdit: () => void;
    onPressAddBefore: () => void;
    onPressAddAfter: () => void;
    onPressDelete: () => void;
}
