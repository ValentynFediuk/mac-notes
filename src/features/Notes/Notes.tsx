import { Workspace, TopBar, Sidebar } from 'components';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { DATABESE_NAME, indexedDBConfig } from 'database';
import { useEffect, useReducer, useState } from 'react';
import {
  NotesContext,
  NotesDispatchContext,
  NotesReducer,
  initialNotesState,
} from 'store';
import { useUniqueId } from 'hooks';
import { INote, INotesActions } from 'types';
import { RemoveModal } from '../../components/ui';
import styles from './Notes.module.scss';

initDB(indexedDBConfig);

function Notes(): JSX.Element {
  const { add, getAll, deleteRecord, update } = useIndexedDB(DATABESE_NAME);
  const [notesState, dispatch] = useReducer(NotesReducer, initialNotesState);
  const [notesFromDB, setNotesFromDB] = useState(notesState);

  const selectedNote = notesState.find((note) => note.selected === true);

  async function fetchNotes() {
    try {
      const notes: INote[] = await getAll();

      const loadNotesFromDB: INotesActions = {
        type: 'LOAD_NOTES_FROM_DB',
        payload: { notes },
      };

      dispatch(loadNotesFromDB);

      setNotesFromDB(notes);
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

  function setPreveousSelectedToFalse() {
    try {
      const setPreveousSelectedToFalseAction: INotesActions = {
        type: 'SET_PREVIOUS_SELECTED_NOTE_TO_FALSE',
      };

      dispatch(setPreveousSelectedToFalseAction);
      notesState.forEach(async (note) => {
        await update({ ...note, selected: false, edit: false });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.toString());
      } else {
        throw new Error(`An unknown error occurred: ${error}`);
      }
    }
  }

  const newNoteId = useUniqueId();

  function handleAddNote() {
    const newNote = {
      id: newNoteId,
      title: '',
      text: '',
      date: new Date(),
      selected: true,
      edit: false,
    };

    setPreveousSelectedToFalse();

    const action: INotesActions = {
      type: 'ADD_NOTE',
      payload: { note: newNote },
    };

    dispatch(action);

    add(newNote);
  }

  const [removeModalState, setRemoveModalState] = useState({
    show: false,
    confirm: false,
  });

  function handleDeleteNote() {
    setRemoveModalState({ ...removeModalState, show: true });
  }

  useEffect(() => {
    if (removeModalState.confirm) {
      const deleteNoteAction: INotesActions = {
        type: 'DELETE_SELECTED_NOTE',
      };

      dispatch(deleteNoteAction);

      deleteRecord(selectedNote?.id);
      setRemoveModalState({ show: false, confirm: false });
    }
  }, [removeModalState.confirm]);

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
            notesFromDB={notesFromDB}
            fetchNotes={fetchNotes}
          />
          <Sidebar
            handleSelectNote={handleSelectNote}
            handleTypeNoteTitle={handleTypeNoteTitle}
          />
          <Workspace handleTypeNote={handleTypeNote} />
          <RemoveModal
            setRemoveModalState={setRemoveModalState}
            removeModalState={removeModalState}
          />
        </NotesDispatchContext.Provider>
      </NotesContext.Provider>
    </div>
  );
}

export default Notes;
