import { createContext } from 'react';
import { DispatchNotes, INotesState } from 'types';

const initialNotesState: INotesState = [{ id: 0, text: '', date: 'now' }];

const NotesContext = createContext(initialNotesState);
const NotesDispatchContext = createContext<DispatchNotes>(() => {});

export { NotesContext, NotesDispatchContext, initialNotesState };
