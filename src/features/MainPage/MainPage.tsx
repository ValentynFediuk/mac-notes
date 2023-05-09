import { Workspace, TopBar, Sidebar } from 'components';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { indexedDBConfig } from 'database';
import { useReducer } from 'react';
import {
  NotesContext,
  NotesDispatchContext,
  NotesReducer,
  initialNotesState,
} from 'store';
import styles from './MainPage.module.scss';

initDB(indexedDBConfig);

function MainPage(): JSX.Element {
  const { add } = useIndexedDB('notes-test');

  function createNote() {
    add({ text: 'fuck you', date: Date.now() });
  }

  const [usersState, dispatch] = useReducer(NotesReducer, initialNotesState);

  return (
    <div className={styles.wrapper}>
      <NotesContext.Provider value={usersState}>
        <NotesDispatchContext.Provider value={dispatch}>
          <TopBar />
          <Sidebar />
          <Workspace />
        </NotesDispatchContext.Provider>
      </NotesContext.Provider>
    </div>
  );
}

export default MainPage;
