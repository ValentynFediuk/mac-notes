import { INote } from 'types';

export interface SidebarProps {
  handleTypeNoteTitle: (note: INote, newTitle: string) => Promise<void>;
  handleSelectNote: (note: INote) => Promise<void>;
}
