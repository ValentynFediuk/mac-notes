import { createContext } from 'react';
import { DispatchNotes, INotesState } from 'types';

const initialNotesState: INotesState = [];

const NotesContext = createContext(initialNotesState);
const NotesDispatchContext = createContext<DispatchNotes>(() => {});

export { NotesContext, NotesDispatchContext, initialNotesState };
