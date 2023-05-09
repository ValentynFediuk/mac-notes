import { Dispatch } from 'react';

type INote = { id: string; text: string; date: Date; selected: boolean };

type DispatchNotes = Dispatch<INotesActions>;

type INotesActions =
  | { type: 'ADD_NOTE'; payload: { note: INote } }
  | { type: 'DELETE_NOTE'; payload: { id: string } }
  | { type: 'SELECT_NOTE'; payload: { selected: boolean } }
  | { type: 'SET_SELECTED_FALSE'; payload: { id: string } };

type INotesState = INote[];

export type { INote, INotesState, INotesActions, DispatchNotes };
