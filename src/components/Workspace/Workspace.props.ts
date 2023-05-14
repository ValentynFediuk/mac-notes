import { INote } from 'types';

export interface WorkspaceProps {
  handleTypeNote: (selectedNote: INote, newText: string) => Promise<void>;
}
