import { INotesActions, INotesState } from 'types';

const NotesReducer = (
  state: INotesState,
  action: INotesActions
): INotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload.note];
    case 'DELETE_SELECTED_NOTE':
      return state.filter((note) => note.selected === false);
    case 'TYPE_NOTE_TITLE':
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, title: action.payload.title }
          : { ...note }
      );
    case 'TYPE_NOTE':
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, text: action.payload.text }
          : { ...note }
      );
    case 'SELECT_NOTE':
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, selected: true }
          : { ...note, selected: false }
      );
    case 'EDIT_NOTE':
      return state.map((note) =>
        note.id === action.payload.selectedNote.id
          ? { ...note, edit: !action.payload.selectedNote.edit }
          : { ...note, edit: false }
      );
    case 'SET_PREVIOUS_SELECTED_NOTE_TO_FALSE':
      return state.map((note) => ({ ...note, selected: false }));
    case 'LOAD_NOTES_FROM_DB':
      return [...action.payload.notes];
    case 'LOAD_FILTERED_NOTES':
      return [...action.payload.notes];
    default:
      return state;
  }
};

export default NotesReducer;
