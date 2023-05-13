import { Workspace, TopBar, Sidebar } from 'components';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { DATABESE_NAME, indexedDBConfig } from 'database';
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
  const [notesState, dispatch] = useReducer(NotesReducer, initialNotesState);
  const { add } = useIndexedDB(DATABESE_NAME);
  const { getAll } = useIndexedDB(DATABESE_NAME);
  const { deleteRecord } = useIndexedDB(DATABESE_NAME);
  const { update } = useIndexedDB(DATABESE_NAME);

  const selectedNote = notesState.find((note) => note.selected === true);

  function setPreveousSelectedToFalse() {
    try {
      const setPreveousSelectedToFalseAction: INotesActions = {
        type: 'SET_PREVIOUS_SELECTED_NOTE_TO_FALSE',
      };

      dispatch(setPreveousSelectedToFalseAction);
      notesState.forEach(async (note) => {
        await update({ ...note, selected: false });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.toString());
      } else {
        throw new Error(`An unknown error occurred: ${error}`);
      }
    }
  }

  async function fetchNotes() {
    try {
      const notes: INote[] = await getAll();

      const loadNotesFromDB: INotesActions = {
        type: 'LOAD_NOTES_FROM_DB',
        payload: { notes },
      };

      dispatch(loadNotesFromDB);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.toString());
      } else {
        throw new Error(`An unknown error occurred: ${error}`);
      }
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const newNoteId = useUniqueId();

  function handleAddNote() {
    const newNote = {
      id: newNoteId,
      text: '',
      date: new Date(),
      selected: true,
    };

    setPreveousSelectedToFalse();

    const action: INotesActions = {
      type: 'ADD_NOTE',
      payload: { note: newNote },
    };

    dispatch(action);

    add(newNote);
  }

  function handleDeleteNote() {
    const deleteNoteAction: INotesActions = {
      type: 'DELETE_SELECTED_NOTE',
    };

    dispatch(deleteNoteAction);

    deleteRecord(selectedNote?.id);
  }

  function handleClickEdit() {
    if (!selectedNote) return;

    const editNoteAction: INotesActions = {
      type: 'EDIT_NOTE',
      payload: { selectedNote },
    };

    dispatch(editNoteAction);
    update(selectedNote);
  }

  async function handleTypeNoteTitle(note: INote, newTitle: string) {
    try {
      await update({ ...note, title: newTitle });
      const typeNoteTitleAction: INotesActions = {
        type: 'TYPE_NOTE_TITLE',
        payload: { ...note, title: newTitle },
      };

      dispatch(typeNoteTitleAction);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.toString());
      } else {
        throw new Error(`An unknown error occurred: ${error}`);
      }
    }
  }

  async function handleTypeNote(note: INote, newText: string) {
    try {
      await update({ ...note, text: newText });
      const typeNoteAction: INotesActions = {
        type: 'TYPE_NOTE',
        payload: { ...note, text: newText },
      };

      dispatch(typeNoteAction);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.toString());
      } else {
        throw new Error(`An unknown error occurred: ${error}`);
      }
    }
  }

  async function handleSelectNote(note: INote) {
    const { id } = note;
    const selectNoteAction: INotesActions = {
      type: 'SELECT_NOTE',
      payload: { id },
    };

    setPreveousSelectedToFalse();

    dispatch(selectNoteAction);
    update(note);
  }

  return (
    <div className={styles.wrapper}>
      <NotesContext.Provider value={notesState}>
        <NotesDispatchContext.Provider value={dispatch}>
          <TopBar
            handleAddNote={handleAddNote}
            handleDeleteNote={handleDeleteNote}
            handleClickEdit={handleClickEdit}
            fetchNotes={fetchNotes}
          />
          <Sidebar
            handleSelectNote={handleSelectNote}
            handleTypeNoteTitle={handleTypeNoteTitle}
          />
          <Workspace handleTypeNote={handleTypeNote} />
        </NotesDispatchContext.Provider>
      </NotesContext.Provider>
    </div>
  );
}

export default MainPage;
