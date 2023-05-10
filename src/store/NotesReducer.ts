import { INotesActions, INotesState } from 'types';

const NotesReducer = (
  state: INotesState,
  action: INotesActions
): INotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload.note];
    case 'DELETE_NOTE':
      return state.filter((note) => note.id !== action.payload.id);
    case 'TYPE_NOTE':
      return [...state, action.payload.note];
    case 'SELECT_NOTE':
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, selected: true }
          : { ...note, selected: false }
      );
    case 'SET_PREVIOUS_SELECTED_NOTE_TO_FALSE':
      return state.map((note) => ({ ...note, selected: false }));
    case 'LOAD_NOTES_FROM_DB':
      return [...action.payload.notes];
    default:
      return state;
  }
};

export default NotesReducer;
