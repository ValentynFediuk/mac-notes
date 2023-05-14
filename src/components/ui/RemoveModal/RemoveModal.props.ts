export interface RemoveModalProps {
  setRemoveModalState: React.Dispatch<
    React.SetStateAction<{ show: boolean; confirm: boolean }>
  >;
  removeModalState: { show: boolean; confirm: boolean };
}
