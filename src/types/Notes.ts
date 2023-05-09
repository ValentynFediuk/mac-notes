import { Dispatch } from 'react';

type INote = { id: number; text: string; date: string };

type DispatchNotes = Dispatch<INotesActions>;

type INotesActions =
  | { type: 'ADD_NOTE'; payload: { note: INote } }
  | { type: 'DELETE_NOTE'; payload: { id: number } };

type INotesState = INote[];

export type { INote, INotesState, INotesActions, DispatchNotes };
