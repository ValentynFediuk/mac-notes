import { Dispatch } from 'react';

type INote = { id: string; text: string; date: Date; selected: boolean };

type DispatchNotes = Dispatch<INotesActions>;

type INotesActions =
  | { type: 'ADD_NOTE'; payload: { note: INote } }
  | { type: 'DELETE_NOTE'; payload: { id: string } }
  | { type: 'SELECT_NOTE'; payload: { id: string } }
  | { type: 'SET_PREVIOUS_SELECTED_NOTE_FALSE' }
  | { type: 'LOAD_NOTES_FROM_DB'; payload: { notes: [] } };
type INotesState = INote[];

export type { INote, INotesState, INotesActions, DispatchNotes };
