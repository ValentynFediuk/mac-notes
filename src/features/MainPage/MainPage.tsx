import { Workspace, TopBar, Sidebar } from 'components';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { indexedDBConfig } from 'database';
import { useEffect, useReducer } from 'react';
import {
  NotesContext,
  NotesDispatchContext,
  NotesReducer,
  initialNotesState,
} from 'store';
import { useUniqueId } from 'hooks';
import { INote, INotesActions } from 'types';
import styles from './MainPage.module.scss';

initDB(indexedDBConfig);

function MainPage(): JSX.Element {
  const [usersState, dispatch] = useReducer(NotesReducer, initialNotesState);
  const { add } = useIndexedDB('notes-test');
  const { getAll } = useIndexedDB('notes-test');
  useEffect(() => {
    (async () => {
      try {
        const notes: INote[] = await getAll();

        const loadNotesFromDB: INotesActions = {
          type: 'LOAD_NOTES_FROM_DB',
          payload: { notes },
        };

        dispatch(loadNotesFromDB);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  const newNoteId = useUniqueId();

  function handleAddNote() {
    const newNote = {
      id: newNoteId,
      text: '',
      date: new Date(),
      selected: true,
    };

    const setSelectedFalse: INotesActions = {
      type: 'SET_PREVIOUS_SELECTED_NOTE_FALSE',
    };

    dispatch(setSelectedFalse);

    const action: INotesActions = {
      type: 'ADD_NOTE',
      payload: { note: newNote },
    };

    dispatch(action);

    add(newNote);
  }

  return (
    <div className={styles.wrapper}>
      <NotesContext.Provider value={usersState}>
        <NotesDispatchContext.Provider value={dispatch}>
          <TopBar handleAddNote={handleAddNote} />
          <Sidebar />
          <Workspace />
        </NotesDispatchContext.Provider>
      </NotesContext.Provider>
    </div>
  );
}

export default MainPage;
