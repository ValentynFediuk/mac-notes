import { INote } from 'types';

export interface TopBarProps {
  handleAddNote: () => void;
  handleClickEdit: () => void;
  handleDeleteNote: () => void;
  notesFromDB: INote[];
  fetchNotes: () => Promise<void>;
}
