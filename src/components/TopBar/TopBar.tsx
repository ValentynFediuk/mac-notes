import sprite from 'assets/icons/sprite.svg';
import { useContext } from 'react';
import { NotesDispatchContext } from 'store';
import { INotesActions } from 'types';
import { useUniqueId } from 'hooks';
import { Button, Search } from '../ui';
import styles from './TopBar.module.scss';

function TopBar() {
  const dispatch = useContext(NotesDispatchContext);
  const newNoteId = useUniqueId();

  function handleAddNote() {
    const newNote = {
      id: newNoteId,
      text: '',
      date: new Date(),
      selected: true,
    };
    const action: INotesActions = {
      type: 'ADD_NOTE',
      payload: { note: newNote },
    };
    dispatch(action);

    const setSelectedFalse: INotesActions = {
      type: 'SET_SELECTED_FALSE',
      payload: { id: newNoteId },
    };

    dispatch(setSelectedFalse);
  }
  return (
    <header className={styles.wrapper}>
      <nav>
        <div className={styles.buttons}>
          <Button
            handleClick={handleAddNote}
            appearance="primary"
            typeBtn="button"
          >
            <svg>
              <use href={`${sprite}#plus`} />
            </svg>
          </Button>
          <Button appearance="primary" typeBtn="button">
            <svg>
              <use href={`${sprite}#recycle-bin`} />
            </svg>
          </Button>
          <Button appearance="primary" typeBtn="button">
            <svg>
              <use href={`${sprite}#edit`} />
            </svg>
          </Button>
        </div>
        <Search appearance="primary" inputType="text" placeholder="Search" />
      </nav>
    </header>
  );
}

export default TopBar;
