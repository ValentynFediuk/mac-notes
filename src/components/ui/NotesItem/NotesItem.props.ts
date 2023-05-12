import { INote } from 'types';

export interface NotesItemProps {
  id: string;
  title: string;
  text: string;
  date: Date;
  selected: boolean;
  edit: boolean;
  handleSelectNote: (note: INote) => Promise<void>;
  handleTypeNoteTitle: (note: INote, newTitle: string) => Promise<void>;
}
