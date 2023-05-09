import { INote, INotesActions, INotesState } from 'types';

const NotesReducer = (
  state: INotesState,
  action: INotesActions
): INotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload.note];
    case 'DELETE_NOTE':
      return state.filter((note) => note.id !== action.payload.id);
    case 'SELECT_NOTE':
      return [...state, action.payload.selected] as INote[];
    case 'SET_SELECTED_FALSE':
      return state.map((note) => ({
        ...note,
        selected: note.id === action.payload.id ? false : note.selected,
      })) as INote[];
    default:
      return state;
  }
};

export default NotesReducer;
