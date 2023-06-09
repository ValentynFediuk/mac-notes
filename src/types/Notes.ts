import { Dispatch } from 'react';

type INote = {
  id: string;
  title: string;
  text: string;
  date: Date;
  selected: boolean;
  edit: boolean;
};

type DispatchNotes = Dispatch<INotesActions>;

type INotesActions =
  | { type: 'ADD_NOTE'; payload: { note: INote } }
  | { type: 'DELETE_SELECTED_NOTE' }
  | { type: 'TYPE_NOTE_TITLE'; payload: { id: string; title: string } }
  | { type: 'TYPE_NOTE'; payload: { id: string; text: string } }
  | { type: 'SELECT_NOTE'; payload: { id: string } }
  | { type: 'EDIT_NOTE'; payload: { selectedNote: INote } }
  | { type: 'SET_PREVIOUS_SELECTED_NOTE_TO_FALSE' }
  | { type: 'LOAD_NOTES_FROM_DB'; payload: { notes: INote[] } }
  | { type: 'LOAD_FILTERED_NOTES'; payload: { notes: INote[] } };
type INotesState = INote[];

export type { INote, INotesState, INotesActions, DispatchNotes };
