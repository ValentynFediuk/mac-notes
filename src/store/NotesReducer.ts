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
    default:
      return state;
  }
};

export default NotesReducer;
